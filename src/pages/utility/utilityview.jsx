import React, { useState } from 'react';
import './utilitystyle.css';
import { Card, Row, Col, Button, Form, Select } from 'antd';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {MaterialReactTable} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import {data} from './utilityData';
import { DeleteOutline } from '@mui/icons-material';
const { Option } = Select;

const UtilityView =()=>{
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);
  const [acctNum, setAcctNum] = useState(null);
  const [form] = Form.useForm();
  const accountsOptions = data?.map(obj=>obj.accountNumber);

  const handleAcctChnage = (e) =>{
    setAcctNum(e);
  }

  const generateMutedColor = () => {
    const baseColor = Math.floor(Math.random() * 360); // Generate a random hue
    const saturation = Math.floor(Math.random() * 50) + 60; // Slightly muted saturation
    const lightness = Math.floor(Math.random() * 50) + 40; // Slightly muted lightness
    return `hsl(${baseColor}, ${saturation}%, ${lightness}%)`;
  };

  const environmentBudgets = postResult?.reduce((accumulator, item) => {
    const { environment, approvedBudget } = item;
    accumulator[environment] = (accumulator[environment] || 0) + approvedBudget;
    return accumulator;
  }, {});

  const pieChartData = Object.keys(environmentBudgets).map(environment => ({
    name: environment,
    value: environmentBudgets[environment],
  }));

  const pieColors = pieChartData.map(() => generateMutedColor());

  const pieConfig = {
    data: pieChartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const getDate = (dateString) => new Date(dateString);

  const monthlyUtilization = postResult.reduce((accumulator, item) => {
    const { approvedGoLiveDate, approvedBudget } = item;
    const monthKey = getDate(approvedGoLiveDate).toLocaleDateString('en-US', { month: 'short' });

    accumulator[monthKey] = (accumulator[monthKey] || 0) + approvedBudget;
    return accumulator;
  }, {});

  const barChartData = Object.keys(monthlyUtilization).map(month => ({
    name: month,
    value: monthlyUtilization[month],
  }));

  const barColors = barChartData.map(() => generateMutedColor());

  const barConfig = {
    data: barChartData,
    xField: 'month',
    yField: 'utilization',
    seriesField: 'month',
    isGroup: true,
    columnWidthRatio: 0.6,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
      },
    },
    tooltip: { shared: true },
  };

  const exportCsv = () => {
    // Implement logic to export data to CSV
    console.log('Exporting to CSV...');
  };

  const columns = [
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
          accessorKey: 'fundStatusIndicator',
          id: 'fundStatusIndicator',
          header: 'Fund Status Indicator',
          size: 250,
        },
        {
          accessorKey: 'accountNumber',
          id: 'accountNumber',
          header: 'Account #',
          size: 150,
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
          accessorKey: 'approvedGoLiveDate',
          id: 'approvedGoLiveDate',
          header: 'Go-Live Date',
          size: 150,
        },
        {
          accessorKey: 'enteredBy',
          id: 'enteredBy',
          header: 'Entered By',
          size: 150,
        },
      ],
    },
    {
      id: 'approvedBudgetEntries',
      header: 'Approved Budget Entries',
      columns: [
        {
          accessorKey: 'approvedBudget',
          id: 'approvedBudget',
          header: 'Approved Budget',
          size: 150,
        },
        {
          accessorKey: 'tillWhen',
          id: 'tillWhen',
          header: 'Till When',
          size: 150,
        },
      ],
    },
    {
      id: 'supportingDocuments',
      header: 'Documents',
      columns: [
        {
          accessorKey: 'supportingDocuments',
          id: 'supportingDocuments',
          header: 'Documents',
          size: 150,
        },
      ],
    },
  ];  

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  function onCreateClick(){
    navigate('/createCostutil', {state: {mode:'C'}});
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
        <Card className="top-container" title={<div style={{ textAlign: 'center' }}>Cost Utilisation</div>}>
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
    <div style={{marginTop: '10px'}}> 
      <Row gutter={16}>
        <Col span={12}>
          <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>Overall Utilization</div>}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<div style={{ display: 'flex', textAlign: 'center' }}>Monthly Utilization Trend</div>}
            extra={<Button onClick={exportCsv}>Export to CSV</Button>}
          >
            <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={400} data={barChartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
      <Legend />
      <Bar dataKey="value" fill="#8884d8">
        {barChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
        ))}
      </Bar>
    </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
    <div className='detail-view-container'>
      <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>Cost Utilisation Summary</div>} style={{ marginTop: '10px'}}>
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

export default UtilityView;