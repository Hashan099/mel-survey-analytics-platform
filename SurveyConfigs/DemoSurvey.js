export const DemoSurvey = {
  "title": "Language Training & Official Languages Policy Evaluation",
  "description": "National Languages Division (NLD) — Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government, Sri Lanka",
  "logoWidth": "200px",
  "logoHeight": "100px",
  "logoPosition": "right",
  "completedHtml": "<h3>Bohoma Sthuthi / Nandri! Thank you for your submission.</h3><p>Your feedback has been successfully submitted to the National Languages Division (NLD) MEL database.</p>",
  "sendResultOnPageNext": true,
  "showProgressBar": "belowheader",
  "progressBarType": "questions",
  "completeText": "Submit Evaluation",
  "showPreviewBeforeComplete": "showAllQuestions",
  "widthMode": "responsive",
  "pages": [
    {
      "name": "page1",
      "title": "Officer & Administrative Information",
      "elements": [
        {
          "type": "dropdown",
          "name": "province",
          "title": "Province",
          "isRequired": true,
          "choices": [
            "Western",
            "Central",
            "Southern",
            "Northern",
            "Eastern",
            "North Western",
            "North Central",
            "Uva",
            "Sabaragamuwa"
          ]
        },
        {
          "type": "dropdown",
          "name": "district",
          "title": "District",
          "isRequired": true,
          "choices": [
            "Colombo",
            "Gampaha",
            "Kalutara",
            "Kandy",
            "Matale",
            "Nuwara Eliya",
            "Galle",
            "Matara",
            "Hambantota",
            "Jaffna",
            "Kilinochchi",
            "Mannar",
            "Vavuniya",
            "Mullaitivu",
            "Batticaloa",
            "Ampara",
            "Trincomalee",
            "Kurunegala",
            "Puttalam",
            "Anuradhapura",
            "Polonnaruwa",
            "Badulla",
            "Monaragala",
            "Ratnapura",
            "Kegalle"
          ]
        },
        {
          "type": "text",
          "name": "divisional_secretariat",
          "title": "Divisional Secretariat / Office",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "organization",
          "title": "Ministry / Department / Institution",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "role",
          "title": "Designation / Public Service Role",
          "isRequired": true,
          "choices": [
            "Divisional Secretary / Assistant DS",
            "Development Officer (Language/Administration)",
            "Official Translator / Interpreter",
            "Grama Niladhari",
            "Public Management Assistant",
            "Bilingual Front Desk Officer",
            "Other Public Service Officer"
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Second Language Training & Policy Implementation",
      "elements": [
        {
          "type": "checkbox",
          "name": "training_topics",
          "title": "Which language capacity-building modules were covered? (Select all that apply)",
          "isRequired": true,
          "choices": [
            "Second Language Competency (Sinhala for Tamil Speakers)",
            "Second Language Competency (Tamil for Sinhala Speakers)",
            "Official Languages Policy (OLP) Legal Framework",
            "Bilingual Service Delivery at Public Counters",
            "Official Document Translation & Standards",
            "Language Rights & Citizen Grievance Mechanisms"
          ]
        },
        {
          "type": "radiogroup",
          "name": "most_useful_session",
          "title": "Which module proved most impactful for your day-to-day public service delivery?",
          "isRequired": true,
          "choices": [
            "Second Language Competency (Sinhala for Tamil Speakers)",
            "Second Language Competency (Tamil for Sinhala Speakers)",
            "Official Languages Policy (OLP) Legal Framework",
            "Bilingual Service Delivery at Public Counters",
            "Official Document Translation & Standards",
            "Language Rights & Citizen Grievance Mechanisms"
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": "Training Impact & Self-Assessment",
      "elements": [
        {
          "type": "rating",
          "name": "overall_satisfaction",
          "title": "Overall satisfaction with the NLD language training programme",
          "rateMin": 1,
          "rateMax": 5,
          "minRateDescription": "Very Dissatisfied",
          "maxRateDescription": "Highly Satisfied",
          "isRequired": true
        },
        {
          "type": "rating",
          "name": "trainer_effectiveness",
          "title": "Effectiveness and methodology of the NILET / NLD resource persons",
          "rateMin": 1,
          "rateMax": 5,
          "minRateDescription": "Needs Improvement",
          "maxRateDescription": "Outstanding",
          "isRequired": true
        },
        {
          "type": "matrix",
          "name": "knowledge_change",
          "title": "Rate your proficiency and confidence BEFORE and AFTER the programme",
          "isRequired": true,
          "columns": [
            "No Proficiency",
            "Basic Working Knowledge",
            "Conversational / Intermediate",
            "Fluent / Advanced Professional"
          ],
          "rows": [
            {
              "value": "before_lang",
              "text": "Second Language Speaking Skills (Before Training)"
            },
            {
              "value": "after_lang",
              "text": "Second Language Speaking Skills (After Training)"
            },
            {
              "value": "before_policy",
              "text": "Knowledge of Official Languages Policy (Before Training)"
            },
            {
              "value": "after_policy",
              "text": "Knowledge of Official Languages Policy (After Training)"
            },
            {
              "value": "before_citizen",
              "text": "Confidence in Assisting Citizens Bilingually (Before Training)"
            },
            {
              "value": "after_citizen",
              "text": "Confidence in Assisting Citizens Bilingually (After Training)"
            }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": "Policy Recommendations & Institutional Feedback",
      "elements": [
        {
          "type": "radiogroup",
          "name": "recommend",
          "title": "Would you recommend this language programme to other officers in your Secretariat?",
          "isRequired": true,
          "choices": [
            "Yes, definitely",
            "Probably yes",
            "Neutral",
            "Probably not",
            "No"
          ]
        },
        {
          "type": "comment",
          "name": "feedback",
          "title": "Suggestions for the National Languages Division to improve bilingual public service in your area",
          "rows": 4
        }
      ]
    }
  ]
};
