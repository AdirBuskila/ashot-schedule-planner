import React from 'react';
import { content } from '../i8';


const ShiftCount = ({ shiftCounts, i8 }) => {
    return (
        <div className="shift-count">
            <h2>{content[i8].shiftCountTitle}</h2>
            <table>
                <thead>
                    <tr>
                        <th>{content[i8].guard}</th>
                        <th>{content[i8].numberOfShifts}</th>
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
