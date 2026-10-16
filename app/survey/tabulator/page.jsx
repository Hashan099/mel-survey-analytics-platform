'use client';
import { useEffect, useState } from "react";
import { Model } from "survey-core";
import LoadingSpinner from "../../Components/Utils/LoadingSpinner";
import Navbar from "../../Components/shared/navbar/Navbar";
import "survey-analytics/survey.analytics.datatables.css";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import Protected from "../../../Contexts/Protected";

export default function DashboardDatatables() {
  const [vizPanel, setVizPanel] = useState(null);
  const [questions, setQuestions] = useState("");
  const [responses, setResponses] = useState("");
  const [loading, setLoading] = useState(true);
  const [initializingViz, setInitializingViz] = useState(true);
  const { user, isSuperAdmin } = useAuth();

  // Returns a real Firebase token for normal users, or "demo" for superadmin
  const getToken = async () => {
    if (isSuperAdmin) return "demo";
    return user.getIdToken();
  };

  // Build headers — demo mode skips Firebase token validation on the API
  const buildHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
    ...(isSuperAdmin && { "x-demo-mode": "true" }),
  });

  // Fetch survey data and responses
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    async function fetchData() {
      try {
        const token = await getToken();

        const questionsRes = await axios.get("/api/survey/questions", {
          signal,
          headers: buildHeaders(token),
        });
        setQuestions(questionsRes.data);

        const responsesRes = await axios.get("/api/survey/responses", {
          signal,
          headers: buildHeaders(token),
        });
        setResponses(responsesRes.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request was canceled");
        } else {
          console.error("Error fetching survey data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => {
      controller.abort();
    };
  }, [user, isSuperAdmin]);

  // Initialize visualization panel
  useEffect(() => {
    async function initVizPanel() {
      if (typeof window !== "undefined" && questions && responses) {
        setInitializingViz(true);
        const $ = (await import("jquery")).default;
        const { DataTables } = await import("survey-analytics/survey.analytics.datatables.js");
        await import("datatables.net-dt/js/dataTables.dataTables.js");
        await import("datatables.net-buttons/js/dataTables.buttons.js");
        await import("datatables.net-buttons/js/buttons.print.js");
        await import("datatables.net-buttons/js/buttons.html5.js");
        await import("datatables.net-colreorder/js/dataTables.colReorder.js");
        await import("datatables.net-rowgroup/js/dataTables.rowGroup.js");

        DataTables.initJQuery($);

        const survey = new Model(questions);
        const newVizPanel = new DataTables(survey, responses);
        setVizPanel(newVizPanel);
        setInitializingViz(false);
      }
    }
    if (questions && responses) {
      initVizPanel();
    }
  }, [questions, responses]);

  // Render visualization panel
  useEffect(() => {
    if (vizPanel) {
      const container = document.getElementById("summaryContainer");
      if (container) {
        vizPanel.render("summaryContainer");
      }
    }
  }, [vizPanel]);

  // Remove watermark elements
  useEffect(() => {
    const removeWatermark = () => {
      const watermarkElement = document.querySelectorAll(".sa-commercial__product");
      const watermarkElement2 = document.querySelectorAll(".sa-commercial__text");
      watermarkElement.forEach((element) => { element.style.display = "none"; });
      watermarkElement2.forEach((element) => { element.style.display = "none"; });
    };
    removeWatermark();
    const intervalId = setInterval(removeWatermark, 1);
    return () => { clearInterval(intervalId); };
  }, []);

  if (loading || initializingViz) {
    return <LoadingSpinner />;
  }

  return (
    <Protected>
      <Navbar />
      <div className="mt-16" style={{ height: "80vh", width: "100%" }} id="summaryContainer"></div>
    </Protected>
  );
}
