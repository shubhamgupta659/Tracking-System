import React, { useState } from 'react';
import { Button,Card } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import './licensestyle.css';
import LicenseStatusCount from './licensestatuscount';

const LicenseView =()=>{
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(null);

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
          accessorKey: 'serverInfo.ip',
          id: 'serverIp',
          header: 'Server IP',
          size: 150,
        },
        {
          accessorKey: 'serverInfo.hostname',
          id: 'serverHostname',
          header: 'Hostname',
          size: 150,
        },
        {
          accessorKey: 'ownedBy.appCode',
          id: 'ownedByAppCode',
          header: 'Owned By (App Code)',
          size: 150,
        },
        {
          accessorKey: 'ownedBy.appName',
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
        <Card>
        <div style={{ display: 'flex', gap: '8px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
        Create
      </Button>
      <Button type="primary" icon={<CloudUploadOutlined />} disabled>
        Upload
      </Button>
      <Button type="primary" icon={<DownloadOutlined />} disabled>
        Download
      </Button>
      <Button type="primary" icon={<CheckOutlined />} disabled>
        Assign
      </Button>
    </div>
    </Card>
    </div>
    <div>
      <Card>
      <LicenseStatusCount />
      </Card>
    </div>
    <div className='detail-view-container'>
      <Card style={{ marginTop: '10px'}}>
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
                <></>
              )}
            />
      </Card>
    </div>
    </div>
    );
};

export default LicenseView;