import React, { useState, useContext } from "react";
import { WidgetContext } from "../context/WidgetContext";
import "./AddWidgetModal.css";

const AddWidgetModal = ({ closeModal }) => {
  const { categories, addWidget } = useContext(WidgetContext);

  const categoriesConfig = {
    CSPM: [
      {
        id: "cloudAccounts",
        label: "Cloud Accounts",
        chartType: "pie",
        chartData: {
          labels: ["Connected", "Not Connected"],
          data: [2, 2],
          colors: ["#4958fd", "#b8c7f6"],
        },
      },
      {
        id: "cloudRiskAssessment",
        label: "Cloud Risk Assessment",
        chartType: "pie",
        chartData: {
          labels: ["Failed", "Warning", "Passed"],
          data: [1869, 681, 7253],
          colors: ["#cb1a2c", "#d4a106", "#1a8a34"],
        },
      },
    ],
    CWPP: [
      {
        id: "vulnerabilityManagement",
        label: "Vulnerability Management",
        chartType: "bar",
        chartData: {
          labels: ["Critical", "High"],
          data: [60, 40],
          colors: ["#cb1a2c", "#d4a106"],
        },
      },
      {
        id: "workloadProtection",
        label: "Workload Protection",
        chartType: "line",
        chartData: {
          labels: ["Alert 1", "Alert 2"],
          data: [30, 70],
          colors: ["#4958fd", "#b8c7f6"],
        },
      },
    ],
    Image: [
      {
        id: "imageRiskAssessment",
        label: "Image Risk Assessment",
        chartType: "pie",
        chartData: {
          labels: ["Critical", "High"],
          data: [90, 10],
          colors: ["#cb1a2c", "#d4a106"],
        },
      },
      {
        id: "imageSecurityIssues",
        label: "Image Security Issues",
        chartType: "bar",
        chartData: {
          labels: ["Critical", "High"],
          data: [2, 2],
          colors: ["#cb1a2c", "#d4a106"],
        },
      },
    ],
    Ticket: [
      {
        id: "openTickets",
        label: "Open Tickets",
        chartType: "line",
        chartData: {
          labels: ["Open", "Resolved"],
          data: [4, 1],
          colors: ["#4958fd", "#1a8a34"],
        },
      },
      {
        id: "resolvedTickets",
        label: "Resolved Tickets",
        chartType: "bar",
        chartData: { labels: ["Resolved"], data: [1], colors: ["#1a8a34"] },
      },
    ],
  };

  const [selectedWidgets, setSelectedWidgets] = useState({
    CSPM: {},
    CWPP: {},
    Image: {},
    Ticket: {},
  });

  const [activeTab, setActiveTab] = useState("CSPM");

  const handleCheckboxChange = (category, widgetId) => {
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [category]: {
        ...prevSelectedWidgets[category],
        [widgetId]: !prevSelectedWidgets[category][widgetId],
      },
    }));
  };

  const handleAddWidgets = () => {
    const widgetsToAdd = {
      CSPM: [],
      CWPP: [],
      Image: [],
      Ticket: [],
    };

    Object.keys(selectedWidgets).forEach((category) => {
      Object.keys(selectedWidgets[category]).forEach((widgetId) => {
        if (selectedWidgets[category][widgetId]) {
          const widget = categoriesConfig[category].find(
            (widget) => widget.id === widgetId
          );
          if (widget) {
            widgetsToAdd[category].push({
              name: widget.label,
              chartData: widget.chartData,
              chartType: widget.chartType,
            });
          } else {
            console.warn(
              `Widget with id ${widgetId} not found in category ${category}`
            );
          }
        }
      });
    });

    let hasExceededLimit = false;

    Object.keys(widgetsToAdd).forEach((category) => {
      const currentWidgetCount = categories[category].widgets.length;
      const newWidgetCount = widgetsToAdd[category].length;
      if (currentWidgetCount + newWidgetCount > 3) {
        hasExceededLimit = true;
        alert(
          `You can only add up to 3 widgets per category. Please remove some widgets before adding more in the ${category} category.`
        );
      } else {
        widgetsToAdd[category].forEach((widget) => addWidget(category, widget));
      }
    });

    if (!hasExceededLimit) {
      closeModal();
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Widget</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div>
            <p className="intro-text">
              Personalize your dashboard by adding widgets
            </p>
          </div>
          <div className="modal-body">
            <div className="tab-container">
              {Object.keys(categoriesConfig).map((category) => (
                <div
                  key={category}
                  className={`tab ${activeTab === category ? "active" : ""}`}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </div>
              ))}
            </div>

            {Object.keys(categoriesConfig).map((category) => (
              <div
                key={category}
                className={`tab-content ${
                  activeTab === category ? "active" : ""
                }`}
              >
                {categoriesConfig[category].map((widget) => (
                  <div className="form-check" key={widget.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={widget.id}
                      checked={!!selectedWidgets[category][widget.id]}
                      onChange={() => handleCheckboxChange(category, widget.id)}
                    />
                    <label className="form-check-label" htmlFor={widget.id}>
                      {widget.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddWidgets}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
