'use client';
import { useEffect, useState } from 'react';
import { Model } from 'survey-core';
import LoadingSpinner from '../../Components/Utils/LoadingSpinner';
import Protected from '../../../Contexts/Protected';
import { useAuth } from '../../../Contexts/AuthContext';
import { DemoResponses } from '../../../SurveyConfigs/DemoResponses';

export default function Dashboard() {
  const [vizPanel, setVizPanel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { isSuperAdmin } = useAuth();
  const savedState = typeof window !== 'undefined' ? window.localStorage.getItem("surveyJsDashboardState") : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const vizPanelOptions = { allowHideQuestions: true };

        // Fetch survey questions — demo mode bypasses Firebase token check
        const surveyRes = await fetch('/api/survey/questions', {
          headers: isSuperAdmin ? { 'x-demo-mode': 'true' } : {},
        });
        const surveyJson = await surveyRes.json();

        // Fetch responses — use DemoResponses in demo mode, Firestore otherwise
        let surveyResponses;
        if (isSuperAdmin) {
          surveyResponses = DemoResponses;
        } else {
          const { database } = await import('../../../Firebase/config');
          const { collection, getDocs } = await import('firebase/firestore');
          const snapshot = await getDocs(collection(database, 'survey_responses'));
          surveyResponses = snapshot.docs.map(doc => doc.data());
        }

        const surveyModel = new Model(surveyJson);

        if (isClient) {
          const { VisualizationPanel, DocumentHelper } = await import('survey-analytics');
          const newVizPanel = new VisualizationPanel(
            surveyModel.getAllQuestions(),
            surveyResponses,
            vizPanelOptions
          );

          if (savedState) {
            newVizPanel.state = JSON.parse(savedState);
          }

          newVizPanel.onStateChanged.add((_, state) => {
            window.localStorage.setItem("surveyJsDashboardState", JSON.stringify(state));
          });

          newVizPanel.registerToolbarItem("reload", () => {
            return DocumentHelper.createButton(
              () => { location.reload(); },
              "Reload the page"
            );
          });

          newVizPanel.registerToolbarItem("resetState", () => {
            return DocumentHelper.createButton(
              () => {
                window.localStorage.removeItem("surveyJsDashboardState");
                location.reload();
              },
              "Reset the state"
            );
          });

          setVizPanel(newVizPanel);
        }
      } catch (error) {
        console.error('Error fetching survey data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isClient, savedState, isSuperAdmin]);

  useEffect(() => {
    if (isClient && vizPanel) {
      vizPanel.render('surveyVizPanel');
      return () => {
        vizPanel.clear();
      };
    }
  }, [isClient, vizPanel]);

  useEffect(() => {
    const removeWatermark = () => {
      const watermarkElement = document.querySelectorAll('.sa-commercial__product');
      const watermarkElement2 = document.querySelectorAll('.sa-commercial__text');
      watermarkElement.forEach((element) => { element.style.display = 'none'; });
      watermarkElement2.forEach((element) => { element.style.display = 'none'; });
    };

    if (isClient) {
      removeWatermark();
      const intervalId = setInterval(removeWatermark, 1);
      return () => { clearInterval(intervalId); };
    }
  }, [isClient]);

  return (
    <Protected>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div id="surveyVizPanel" style={{ margin: 'auto', width: '100%', maxWidth: '1400px' }}></div>
        )}
      </div>
    </Protected>
  );
}
