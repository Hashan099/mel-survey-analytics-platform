"use client";
import React, { useEffect, useState } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { FallbackJson } from "../../../SurveyConfigs/Fallback";
import LoadingSpinner from "../../Components/Utils/LoadingSpinner";
import Navbar from "../../Components/shared/navbar/Navbar";
import Protected from "../../../Contexts/Protected";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";

function SurveyCreatorWidget() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { user, isSuperAdmin } = useAuth(); 

  // Helper for auth token
  const getToken = async () => {
    if (isSuperAdmin) return "demo";
    return user?.getIdToken ? await user.getIdToken() : "demo";
  };

  const buildHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
    ...(isSuperAdmin && { "x-demo-mode": "true" }),
  });
  
  // Set isClient to true after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const creatorOptions = {
    showLogicTab: false,
    isAutoSave: true,
  };

  let creator = null;
  if (isClient) {
    creator = new SurveyCreator(creatorOptions);
    creator.JSON = data;
  }

  // Fetch Survey Questions
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const token = await getToken(); 
        const res = await axios.get("/api/survey/questions", {
          headers: buildHeaders(token),
          signal: controller.signal,
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
  }, [user, isSuperAdmin]);

  // Save changes to the DB
  useEffect(() => {
    if (creator) {
      creator.saveSurveyFunc = async (saveNo, callback) => {
        const newJSON = creator.JSON;
        try {
          const token = await getToken(); 
          await axios.post("/api/survey/questions", newJSON, {
            headers: buildHeaders(token),
          });
          callback(saveNo, true);
        } catch (error) {
          console.error("Error saving survey questions:", error);
          callback(saveNo, false);
        }
      };
    }
  }, [creator, user, isSuperAdmin]);

  // To remove the watermark element
  useEffect(() => {
    const removeWatermark = () => {
      const watermarkElement = document.querySelector(".svc-creator__banner");
      if (watermarkElement) {
        watermarkElement.style.display = "none";
      }
    };
    removeWatermark();
    const intervalId = setInterval(removeWatermark, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return isLoading ? (
    <LoadingSpinner color="success" size="4rem" />
  ) : (
    <Protected>
      <>
        <Navbar />
        <div className="mt-16">
          {isClient && <SurveyCreatorComponent creator={creator} />}
        </div>
      </>
    </Protected>
  );
}

export default SurveyCreatorWidget;
