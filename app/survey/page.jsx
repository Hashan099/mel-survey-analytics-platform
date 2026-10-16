"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { FallbackJson } from "../../SurveyConfigs/Fallback";
import LoadingSpinner from "../../app/Components/Utils/LoadingSpinner";
import { useAuth } from "../../Contexts/AuthContext";
import Navbar from "../Components/shared/navbar/Navbar";
import Protected from "../../Contexts/Protected";
import { DefaultLight } from "survey-core/themes";
import axios from "axios";
import ErrorModal from "../Components/Utils/ErrorModal";
import SuccessModal from "../Components/Utils/SuccessModal";
import { getAuth } from "firebase/auth";

function SurveyModel() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccessModal, setSuccessModal] = useState(false);
  const { user, isSuperAdmin } = useAuth();
  const surveyID = isSuperAdmin ? "demo-user" : user?.email;
  const STORAGE_ITEM_KEY = surveyID;

  // Returns a real Firebase token for normal users, or "demo" for superadmin
  const getAuthToken = async () => {
    if (isSuperAdmin) return "demo";
    const currentUser = getAuth().currentUser;
    if (!currentUser) throw new Error("User not logged in");
    return currentUser.getIdToken();
  };

  // Build headers — demo mode skips Firebase token validation on the API
  const buildHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
    ...(isSuperAdmin && { "x-demo-mode": "true" }),
  });

  // Fetch Survey Questions
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const token = await getAuthToken();
        const res = await axios.get("/api/survey/questions", {
          signal: controller.signal,
          headers: buildHeaders(token),
        });
        setData(res.data);
      } catch (error) {
        setData(FallbackJson);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [isSuperAdmin]);

  const survey = new Model(data || {});
  survey.applyTheme(DefaultLight);

  // Handle survey data submission
  survey.onComplete.add(async (res) => {
    const surveyData = res.data;
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        "/api/survey/responses",
        { surveyData, surveyID },
        { headers: buildHeaders(token) }
      );

      if (response.status === 200) {
        setSuccessModal(true);
        localStorage.removeItem(STORAGE_ITEM_KEY);
      }
    } catch (error) {
      setError(error.response?.data || "An error occurred while submitting");
    }
  });

  // Save incomplete survey progress
  function saveSurveyData(survey) {
    const data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(STORAGE_ITEM_KEY, JSON.stringify(data));
  }

  // Restore incomplete survey progress
  const restoreSurveyData = useCallback(
    (survey) => {
      const prevData = window.localStorage.getItem(STORAGE_ITEM_KEY) || null;
      if (prevData) {
        const savedData = JSON.parse(prevData);
        survey.data = savedData;
        if (savedData.pageNo !== undefined) {
          survey.currentPageNo = savedData.pageNo;
        }
      }
    },
    [STORAGE_ITEM_KEY]
  );

  useEffect(() => {
    if (!isLoading && data) {
      restoreSurveyData(survey);
    }
  }, [data, isLoading, restoreSurveyData, survey]);

  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorModal modalTitle={error} />;
  if (showSuccessModal)
    return (
      <SuccessModal modalTitle="Thank You..., Your response has been submitted successfully" />
    );

  return (
    <>
      <Protected>
        <Navbar />
        <div className="mt-16">
          {data && <Survey model={survey} />}
        </div>
      </Protected>
    </>
  );
}

export default SurveyModel;
