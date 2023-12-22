import React, { useState } from 'react';
import './compliancestyle.css';
import { Card, Row, Col, Typography,Button } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { PieChart, Pie, Tooltip, Legend, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Box, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import {data} from './compliancedata';

const { Title } = Typography;

const lessMutedColors = [
  '#80CBC4', // Less Muted Turquoise
  '#FFAB91', // Less Muted Salmon
  '#90A4AE', // Less Muted Blue-Gray
  '#CE93D8', // Less Muted Purple
  '#FFD54F', // Less Muted Yellow
  '#64B5F6', // Less Muted Sky Blue
  '#B0BEC5', // Less Muted Steel Blue
  '#FFCC80', // Less Muted Light Orange
  '#A5D6A7', // Less Muted Light Green
  '#FFF59D', // Less Muted Light Yellow
]; // Muted colors for categories

const nonCompliantPercentageData = [
  { name: 'Non-Compliant', percentage: 40 },
];

const securityScoreAndFailureData = [
  { account: 'Account A', percentage: 20, securityScore: 75 },
  { account: 'Account B', percentage: 10, securityScore: 85 },
  { account: 'Account C', percentage: 30, securityScore: 60 },
  { account: 'Account D', percentage: 15, securityScore: 70 },
  { account: 'Account E', percentage: 25, securityScore: 80 },
  { account: 'Account F', percentage: 18, securityScore: 65 },
  { account: 'Account G', percentage: 22, securityScore: 90 },
  { account: 'Account H', percentage: 12, securityScore: 78 },
  // Add more data as needed
];

const samplePieData = [
  { category: 'All Enabled', value: 15 },
  { category: 'Failed', value: 20 },
  { category: 'Unknown', value: 10 },
  { category: 'No Data', value: 5 },
  { category: 'Passed', value: 30 },
  { category: 'Disabled', value: 20 },
];

const ComplianceView =()=>{
    const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);

  const columns = [
    {
      id: 'generalInfo',
      header: 'General Information',
      columns: [
        {
          accessorKey: 'cloudServiceProvider',
          id: 'cloudServiceProvider',
          header: 'Cloud Service Provider',
          size: 250,
        },
        {
          accessorKey: 'agency',
          id: 'agency',
          header: 'Agency',
          size: 150,
        },
        {
          accessorKey: 'tenantName',
          id: 'tenantName',
          header: 'Tenant Name',
          size: 150,
        },
        {
          accessorKey: 'accountName',
          id: 'accountName',
          header: 'Account Name',
          size: 150,
        },
        {
          accessorKey: 'accountNumber',
          id: 'accountNumber',
          header: 'Account Number',
          size: 150,
        },
      ],
    },
    {
      id: 'checkCounts',
      header: 'Check Counts',
      columns: [
        {
          accessorKey: 'compliantCheckCounts',
          id: 'compliantCheckCounts',
          header: 'Compliant Check',
          size: 150,
        },
        {
          accessorKey: 'nonCompliantCheckCounts',
          id: 'nonCompliantCheckCounts',
          header: 'Non-Compliant Check',
          size: 150,
        },
        {
          accessorKey: 'suppressedChecksCounts',
          id: 'suppressedChecksCounts',
          header: 'Suppressed Checks',
          size: 150,
        },
      ],
    },
    {
      id: 'appDetails',
      header: 'Application Details',
      columns: [
        {
          accessorKey: 'appCodeFullName',
          id: 'appCodeFullName',
          header: 'App Code / Full Name',
          size: 250,
        },
        {
          accessorKey: 'environment',
          id: 'environment',
          header: 'Environment',
          size: 150,
        },
      ],
    },
    {
      id: 'dates',
      header: 'Dates',
      columns: [
        {
          accessorKey: 'goLiveDate',
          id: 'goLiveDate',
          header: 'Go Live Date',
          size: 150,
        },
        {
          accessorKey: 'createdDate',
          id: 'createdDate',
          header: 'Created Date',
          size: 150,
        },
        {
          accessorKey: 'createdBy',
          id: 'createdBy',
          header: 'Created By',
          size: 150,
        },
        {
          accessorKey: 'updatedDate',
          id: 'updatedDate',
          header: 'Updated Date',
          size: 150,
        },
        {
          accessorKey: 'updatedBy',
          id: 'updatedBy',
          header: 'Updated By',
          size: 150,
        },
      ],
    }
  ];

  function onCreateClick(){
    navigate('/createCompliance', {state: {mode:'C'}});
  }
    return (
      <div className='main-view-container'>
    <div>
        <Card title="Security Compliance">
        <div style={{ display: 'flex', gap: '8px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
        Create
      </Button>
      <Button type="primary" icon={<CloudUploadOutlined />} disabled>
        Upload
      </Button>
    </div>
    </Card>
    </div>
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card className="security-compliance" title="Security Compliance Overview">
            <PieChart width={400} height={300}>
              <Pie
                data={samplePieData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {samplePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={lessMutedColors[index % lessMutedColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend formatter={(value, entry, index) => `${samplePieData[index].category}`} />
            </PieChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="security-compliance" title="Total Non-Compliant Applications Percentage">
            <BarChart width={400} height={300} data={nonCompliantPercentageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#FFAB91" />
            </BarChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="security-compliance" title="Security Score and Check Failure Percentage per Account">
            <BarChart width={400} height={300} data={securityScoreAndFailureData}>
              <XAxis dataKey="account" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar dataKey="percentage" fill={lessMutedColors[1]} yAxisId="left" />
              <Bar dataKey="securityScore" fill={lessMutedColors[4]} yAxisId="right" />
            </BarChart>
          </Card>
        </Col>
        </Row>
        </div>
    <div className='detail-view-container'>
      <Card title="Security Compliance Details" style={{ marginTop: '10px'}}>
      <MaterialReactTable
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  size: 120,
                },
              }}
              enableRowActions
              columns={columns}
              data={postResult === null ? [] : postResult}
              enableColumnFilterModes
              enableColumnOrdering
              enableGrouping
              enablePinning
              enableRowSelection={false}
              enableSelectAll={false}
              initialState={{ showColumnFilters: true, density: 'compact', columnVisibility: { Select: false } }}
              positionToolbarAlertBanner='bottom'
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      table.setEditingRow(row);
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      data.splice(row.index, 1); //assuming simple data table
                      setPostResult([...data]);
                    }}
                  >
                    <DeleteOutline/>
                  </IconButton>
                </Box>
              )}
            />
      </Card>
    </div>
    </div>
    );
};

export default ComplianceView;