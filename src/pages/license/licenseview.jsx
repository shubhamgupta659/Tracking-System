import React, { useState } from 'react';
import { Button,Card, Row, Col } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_Cell } from 'material-react-table';
import './licensestyle.css';
import LicenseStatusCount from './licensestatuscount';
import {data} from './licensedata';
import { Box, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts';

const LicenseView =()=>{
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);

  const trackedCount = postResult.filter(item => item.tracked === 'Yes').length;
  const notTrackedCount = postResult.length - trackedCount;

  const chartData = [
    { angle: trackedCount, label: 'Tracked' },
    { angle: notTrackedCount, label: 'Not Tracked' },
  ];

  const secondChartData = postResult.map((item, index) => ({
    name: item.softwareName,
    uv: item.attestations,
    pv: index,
    fill: '#8884d8',
  }));

  const licenseModes = {};

  postResult.forEach(item => {
    licenseModes[item.licenseMode] = (licenseModes[item.licenseMode] || 0) + 1;
  });

  const anotherChartData = Object.keys(licenseModes).map(mode => ({ name: mode, value: licenseModes[mode] }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF38CB'];

  const columns = [
    {
      id: 'softwareDetails',
      header: 'Software Details',
      columns: [
        {
          accessorKey: 'softwareName',
          id: 'softwareName',
          header: 'Software Name',
          size: 150,
        },
        {
          accessorKey: 'version',
          id: 'version',
          header: 'Version',
          size: 150,
        },
        {
          accessorKey: 'architecture',
          id: 'architecture',
          header: 'Architecture',
          size: 150,
        },
        {
          accessorKey: 'eolDate',
          id: 'eolDate',
          header: 'End-of-Life Date',
          size: 150,
        },
        {
          accessorKey: 'tracked',
          id: 'tracked',
          header: 'Tracked',
          size: 150,
        },
        {
          accessorKey: 'serverIp',
          id: 'serverIp',
          header: 'Server IP',
          size: 150,
        },
        {
          accessorKey: 'serverHostname',
          id: 'serverHostname',
          header: 'Hostname',
          size: 150,
        },
        {
          accessorKey: 'ownedByAppCode',
          id: 'ownedByAppCode',
          header: 'Owned By (App Code)',
          size: 150,
        },
        {
          accessorKey: 'ownedByAppName',
          id: 'ownedByAppName',
          header: 'Owned By (App Name)',
          size: 150,
        },
        {
          accessorKey: 'division',
          id: 'division',
          header: 'Division',
          size: 150,
        },
        {
          accessorKey: 'firstSeenDate',
          id: 'firstSeenDate',
          header: 'First Seen Date',
          size: 150,
        },
        {
          accessorKey: 'lastSeenDate',
          id: 'lastSeenDate',
          header: 'Last Seen Date',
          size: 150,
        },
        {
          accessorKey: 'licenseMode',
          id: 'licenseMode',
          header: 'License Mode',
          size: 150,
        },
        {
          accessorKey: 'attestations',
          id: 'attestations',
          header: 'Attestations',
          size: 150,
        },
        {
          accessorKey: 'createdBy',
          id: 'createdBy',
          header: 'Created By',
          size: 150,
        },
        {
          accessorKey: 'createdDate',
          id: 'createdDate',
          header: 'Created Date',
          size: 150,
        },
        {
          accessorKey: 'updatedBy',
          id: 'updatedBy',
          header: 'Updated By',
          size: 150,
        },
        {
          accessorKey: 'updatedDate',
          id: 'updatedDate',
          header: 'Updated Date',
          size: 150,
        },
        {
          accessorKey: 'uploadDocuments',
          id: 'uploadDocuments',
          header: 'Upload Documents',
          size: 150,
        },
      ],
    },
  ];
  

  function onCreateClick(){
    navigate('/createLicense', {state: {mode:'C'}});
  }
    return (
      <div className='main-view-container'>
    <div>
        <Card className="top-container" title={<div style={{ textAlign: 'center' }}>License Tracking</div>}>
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
      <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>License Status</div>}>
      <LicenseStatusCount />
      </Card>
    </div>
    <div style={{marginTop: '10px'}}>
    <Row gutter={16}>
        <Col span={8}>
      <Card title="Tracking Status Distribution">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="angle"
          data={chartData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </Card>
      </Col>
        <Col span={8}>
    <Card title="Software Attestations Overview">
      <RadialBarChart width={400} height={400} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={secondChartData}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background dataKey="uv" />
        <Legend iconSize={8} width={100} height={80} layout="vertical" verticalAlign="top" align="right" />
        <Tooltip />
      </RadialBarChart>
    </Card>
    </Col>
        <Col span={8}>
    <Card title="Distribution of License Modes" >
      <PieChart width={400} height={400}>
        <Pie data={anotherChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
          {anotherChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
    <Legend />
      </PieChart>
    </Card>
    </Col>
    </Row>
    </div>
    <div className='detail-view-container'>
      <Card title={<div style={{ display: 'flex', textAlign: 'center' }}>License Summary</div>} style={{ marginTop: '10px'}}>
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

export default LicenseView;