import { useState } from "react";

const useQualificationTabs = (defaultTab = "experience") => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const isActive = (tabId: string): boolean => activeTab === tabId;

  return { activeTab, setActiveTab, isActive };
};

export default useQualificationTabs;
