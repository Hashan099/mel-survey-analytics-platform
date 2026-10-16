import "./globals.css";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import 'survey-analytics/survey.analytics.min.css';
import { AuthProvider } from "../Contexts/AuthContext"; 
export const metadata = {
  title: "MEL-NLD | National Languages Division — Sri Lanka",
  description:
    "Monitoring, Evaluation & Learning (MEL) Platform for the National Languages Division (NLD) — Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government, Sri Lanka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
