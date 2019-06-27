import React from 'react';

const formatOpts = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

const format = number => number.toLocaleString(undefined, formatOpts);

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
          <td>{format(year.interestPaid)}</td>
          <td>{format(year.principalPaid)}</td>
          <td>{format(year.endingPrincipal)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RepaymentsTable;
