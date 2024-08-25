import React from "react";
import "./CategorySection.css";
import ChartComponent from "./ChartComponent";

const CategorySection = ({ category, widgets, removeWidget, openModal }) => {
  const addWidgetButtonsToShow = Math.max(0, 3 - widgets.length);

  return (
    <div className="mb-4">
      <h5 className="category-heading">{category.heading}</h5>
      <div className="row">
        {/* Render Widgets */}
        {widgets.map((widget, index) => (
          <div key={widget.name} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title widget-name d-flex justify-content-between align-items-center">
                  {widget.name}
                  <span
                    className="text-danger cursor-pointer"
                    onClick={() => removeWidget(category.name, widget.name)}
                  >
                    ×
                  </span>
                </h6>
                <div className="card-text">
                  <ChartComponent
                    id={widget.name}
                    chartData={{
                      labels: widget.chartData.labels,
                      datasets: [
                        {
                          data: widget.chartData.data,
                          backgroundColor: widget.chartData.colors,
                        },
                      ],
                    }}
                    chartOptions={{ maintainAspectRatio: false }}
                    chartType={widget.chartType}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {Array.from({ length: addWidgetButtonsToShow }).map((_, index) => (
          <div
            key={`add-widget-${index}`}
            className="col-md-4 mb-3"
            onClick={openModal}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 empty-card">
              <div className="card-body text-center">
                <h6 className="card-title add-widget-text">+ Add Widget</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
