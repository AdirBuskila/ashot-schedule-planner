import React from 'react';

const ShiftCount = ({ shiftCounts }) => {
    return (
        <div className="shift-count">
            <h2>Shift Count Per Guard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Guard</th>
                        <th>Number of Shifts</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(shiftCounts).map(([name, count]) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShiftCount;
