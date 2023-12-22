import React, { useState } from 'react';
import './utilitystyle.css';
import { Card, Row, Col, Button } from 'antd';
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {MaterialReactTable} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import {data} from './utilityData';
import { DeleteOutline } from '@mui/icons-material';

const COLORS = [
  '#80CBC4', // Less Muted Turquoise
  '#FFAB91', // Less Muted Salmon
  '#90A4AE', // Less Muted Blue-Gray
  '#CE93D8', // Less Muted Purple
  '#FFD54F', // Less Muted Yellow
  '#64B5F6', // Less Muted Sky Blue
]; 

const samplePieData = [
  { category: 'Hardware', value: 25 },
  { category: 'Software Licenses', value: 30 },
  { category: 'Cloud Services', value: 20 },
  { category: 'Personnel Costs', value: 15 },
  { category: 'Miscellaneous', value: 10 },
];

const sampleBarData = [
  { month: 'Jan', utilization: 100 },
  { month: 'Feb', utilization: 80 },
  { month: 'Mar', utilization: 120 },
  { month: 'Apr', utilization: 90 },
  { month: 'May', utilization: 110 },
  { month: 'Jun', utilization: 85 },
  { month: 'Jul', utilization: 95 },
  { month: 'Aug', utilization: 75 },
  { month: 'Sep', utilization: 105 },
  { month: 'Oct', utilization: 88 },
  { month: 'Nov', utilization: 92 },
  { month: 'Dec', utilization: 78 },
];

const UtilityView =()=>{
    const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);

  const pieConfig = {
    data: samplePieData,
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

  const barConfig = {
    data: sampleBarData,
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

  const handleExportRows = (rows:any) => {
    const rowData = rows.map((row:any) => row.original);
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
    return (
      <div className='main-view-container'>
    <div>
        <Card title="Cost Utilisation">
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
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Overall Utilization">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={samplePieData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label>
                  {samplePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            title="Monthly Utilization Trend"
            extra={<Button onClick={exportCsv}>Export to CSV</Button>}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleBarData}>
                <Bar dataKey="utilization" fill="#8884d8" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
    <div className='detail-view-container'>
      <Card title="Cost Utilisation Details" style={{ marginTop: '10px'}}>
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