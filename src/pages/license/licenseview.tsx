import React, { useState } from 'react';
import { Button,Card } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_Cell } from 'material-react-table';
import './licensestyle.css';
import LicenseStatusCount from './licensestatuscount';
import {data} from './licensedata';
import { Box, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

const LicenseView =()=>{
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(data);

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
        <Card title="License Tracking">
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
      <Card title="License Status">
      <LicenseStatusCount />
      </Card>
    </div>
    <div className='detail-view-container'>
      <Card title="License Details" style={{ marginTop: '10px'}}>
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