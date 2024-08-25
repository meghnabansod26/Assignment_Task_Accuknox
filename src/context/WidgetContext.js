import React, { useState, createContext, useEffect } from "react";

export const WidgetContext = createContext();

const WidgetProvider = ({ children }) => {
  const loadInitialCategories = () => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : {
          CSPM: { widgets: [] },
          CWPP: { widgets: [] },
          Image: { widgets: [] },
          Ticket: { widgets: [] },
        };
  };

  const [categories, setCategories] = useState(loadInitialCategories);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addWidget = (category, widget) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: {
        ...prevCategories[category],
        widgets: [...prevCategories[category].widgets, widget],
      },
    }));
  };

  const removeWidget = (category, widgetName) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: {
        ...prevCategories[category],
        widgets: prevCategories[category].widgets.filter(
          (widget) => widget.name !== widgetName
        ),
      },
    }));
  };

  const refreshWidgets = () => {
    // Reload the widget data from localStorage
    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    console.log("Widgets refreshed from localStorage");
  };

  return (
    <WidgetContext.Provider
      value={{ categories, addWidget, removeWidget, refreshWidgets }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export { WidgetProvider };
export default WidgetProvider;
