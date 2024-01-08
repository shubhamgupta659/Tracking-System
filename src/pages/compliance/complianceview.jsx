import React, { useState } from 'react';
import './compliancestyle.css';
import { Card, Row, Col, Typography,Button,Form, Select } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { PieChart, Pie, Tooltip, Legend, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Box, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import {data} from './compliancedata';
const { Option } = Select;

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

const ComplianceView =()=>{
    const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);
  const [acctNum, setAcctNum] = useState(null);
  const [form] = Form.useForm();

  const handleAcctChnage = (e) =>{
    setAcctNum(e);
  }

  const accountsOptions = data?.map(obj=>obj.accountNumber);

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28']; // You can customize colors as needed

  const totalChecks = postResult.reduce(
    (sum, { compliantCheckCounts, nonCompliantCheckCounts, suppressedChecksCounts }) =>
      sum + compliantCheckCounts + nonCompliantCheckCounts + suppressedChecksCounts,
    0
  );

  const nonCompliantPercentage = (postResult.reduce((sum, { nonCompliantCheckCounts }) => sum + nonCompliantCheckCounts, 0) /
    totalChecks) * 100;

  const barChartData = [
    { name: 'Non-Compliant Percentage', value: nonCompliantPercentage.toFixed(2) },
  ];

  const pieData = [
    { name: 'Compliant', value: postResult.reduce((sum, { compliantCheckCounts }) => sum + compliantCheckCounts, 0) },
    { name: 'Non-Compliant', value: postResult.reduce((sum, { nonCompliantCheckCounts }) => sum + nonCompliantCheckCounts, 0)},
    { name: 'Suppressed', value: postResult.reduce((sum, { suppressedChecksCounts }) => sum + suppressedChecksCounts, 0) },
  ];

  const barData = postResult.map(item => ({
    accountName: item.accountName,
    securityScore: item.compliantCheckCounts / (item.compliantCheckCounts + item.nonCompliantCheckCounts),
    checkFailurePercentage: (item.nonCompliantCheckCounts / (item.compliantCheckCounts + item.nonCompliantCheckCounts)) * 100,
  }));

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

  // Handle filter button click
  const handleFilter = () => {
    const values = form.getFieldsValue();
    setPostResult(data?.filter(obj=> obj.accountNumber === values?.accountNumber));
  };

  // Handle reset button click
  const handleReset = () => {
    setAcctNum(null);
    form.resetFields();
    setPostResult(data);
  };

    return (
      <div className='main-view-container'>
    <div>
        <Card className="top-container" title={<div style={{ textAlign: 'center' }}>Security Compliance</div>}>
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
    <div style={{marginTop: '10px'}}> 
    <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>Search Filters</div>}>
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        {/* First row - Select dropdown */}
        <Col span={6}>
          <Form.Item name="accountNumber" label="Account Number">
            <Select placeholder="Select an account number" onChange={e=>handleAcctChnage(e)}>
              {accountsOptions.map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" style={{ marginRight: 8 }} onClick={handleFilter} disabled={form.getFieldValue("accountNumber") === null || form.getFieldValue("accountNumber") === undefined}>
            Filter
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
    </Form>
    </Card>
    </div>
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>Security Compliance Overview</div>} className="security-compliance">
          <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="security-compliance" title={<div style={{ display: 'flex', textAlign: 'center' }}>Total Non-Compliant Applications Percentage</div>}>
          <BarChart width={400} height={400} data={barChartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#FFBB28">
        {barChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#FFBB28" />
        ))}
      </Bar>
    </BarChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="security-compliance" title={<div style={{ display: 'flex', textAlign: 'center' }}>Security Score and Check Failure Percentage per Account</div>} >
          <BarChart width={600} height={400} data={barData}>
      <XAxis dataKey="accountName" />
      <YAxis yAxisId="left" label={{ value: 'Security Score', angle: -90, position: 'insideLeft' }} />
      <YAxis yAxisId="right" orientation="right" label={{ value: 'Check Failure Percentage (%)', angle: 90, position: 'insideRight' }} />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="securityScore" fill="#0088FE">
        {barData.map((entry, index) => (
          <Cell key={`cell-securityScore-${index}`} fill="#0088FE" />
        ))}
      </Bar>
      <Bar yAxisId="right" dataKey="checkFailurePercentage" fill="#FFBB28">
        {barData.map((entry, index) => (
          <Cell key={`cell-checkFailurePercentage-${index}`} fill="#FFBB28" />
        ))}
      </Bar>
    </BarChart>
          </Card>
        </Col>
        </Row>
        </div>
    <div className='detail-view-container'>
      <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>Security Compliance Details</div>} style={{ marginTop: '10px'}}>
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