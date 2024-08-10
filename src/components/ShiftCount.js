import React from 'react';
import { content } from '../i8';
import { getDisplayName } from '../utils/tableUtils';

const ShiftCount = ({ shiftCounts, i8 }) => {
    const guardNamesMapping = content[i8].guardNames;

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
                            <td>{getDisplayName(name, guardNamesMapping, i8)}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShiftCount;
