import React, { useEffect, useMemo, useRef } from 'react';
import { Chart } from 'chart.js';
import { useSelector } from 'react-redux';
import { metronic } from '../../_metronic';

export default function OrderStatisticsChart() {
  const ref = useRef();
  const { brandColor, shape2Color, shape3Color } = useSelector((state) => ({
    brandColor: metronic.builder.selectors.getConfig(state, 'colors.state.brand'),
    shape2Color: metronic.builder.selectors.getConfig(state, 'colors.base.shape.2'),
    shape3Color: metronic.builder.selectors.getConfig(state, 'colors.base.shape.3'),
  }));

  const data = useMemo(
    () => ({
      labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
      datasets: [
        {
          label: 'Car Speed (mph)',
          data: [0, 59, 75, 20, 20, 55, 40],
        },
      ],
    }),
    [brandColor]
  );

  useEffect(() => {
    // For more information about the chartjs, visit this link
    // https://www.chartjs.org/docs/latest/getting-started/usage.html

    const chart = new Chart(ref.current, {
      data,
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, brandColor, shape2Color, shape3Color]);

  return (
    <div className="kt-widget12">
      <div className="kt-widget12__content">
        <div className="kt-widget12__item">
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Annual Taxes EMS</span>
            <span className="kt-widget12__value">$400,000</span>
          </div>
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Finance Review Date</span>
            <span className="kt-widget12__value">July 24,2019</span>
          </div>
        </div>
        <div className="kt-widget12__item">
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Avarage Revenue</span>
            <span className="kt-widget12__value">$60M</span>
          </div>
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Revenue Margin</span>
            <div className="kt-widget12__progress">
              <div className="progress kt-progress--sm">
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuenow={100}
                  aria-valuemax={100}
                  style={{ width: '40%' }}
                  className="progress-bar bg-success"
                />
              </div>
              <span className="kt-widget12__stat">40%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kt-widget12__chart" style={{ height: '250px' }}>
        <canvas ref={ref} width={683} height={312} id="kt_chart_order_statistics" />
      </div>
    </div>
  );
}
