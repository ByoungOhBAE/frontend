import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartPie = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // 차트 설정
        const configPie = {
            type: "pie",
            data: data,
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const labelIndex = context.dataIndex;
                                const data = context.dataset.data;
                                const total = data.reduce((acc, value) => acc + value, 0);
                                const percentage = ((data[labelIndex] / total) * 100).toFixed(1);
                                return `${percentage}%`;
                            },
                        },
                    },
                },
            },
        };

        // 차트를 그릴 때 차트가 이미 그려진 경우 이전 차트를 파괴하고 새로운 차트를 그림
        const canvas = chartRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                new Chart(ctx, configPie);
            }
        }
    }, [data]);

    return <canvas ref={chartRef} className="p-1" />;
};

export default ChartPie;