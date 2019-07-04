import React from 'react';
import formatCurrency from './formatCurrency';

const RepaymentsTable = ({ years }) => (
  <table>
    <thead>
      <tr>
        <th>After year</th>
        <th>Interest paid</th>
        <th>Principal paid</th>
        <th>Principal remaining</th>
      </tr>
    </thead>
    <tbody>
      {years.map((year, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{formatCurrency(year.interestPaid)}</td>
          <td>{formatCurrency(year.principalPaid)}</td>
          <td>{formatCurrency(year.endingPrincipal)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RepaymentsTable;
