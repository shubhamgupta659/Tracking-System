import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

const dummyLicenseData = {
  active: 150,
  expired: 30,
  renewed: 20,
  pendingRenewal: 10,
  suspended: 5,
};

const mutedColors = ['#E57373', '#90A4AE', '#FFD54F', '#81C784', '#B39DDB'];

const LicenseStatusCount = () => {
  return (
    <div style={{marginTop: '10px'}}>
      <Row gutter={16} justify="center" align="middle">
        <Col span={4}>
          <Card style={{ background: mutedColors[0], width: '100%' }}>
            <Statistic title="Suspended Licenses" value={dummyLicenseData.suspended} />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ background: mutedColors[1], width: '100%' }}>
            <Statistic title="Active Licenses" value={dummyLicenseData.active} />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ background: mutedColors[2], width: '100%' }}>
            <Statistic title="Expired Licenses" value={dummyLicenseData.expired} />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ background: mutedColors[3], width: '100%' }}>
            <Statistic title="Renewed Licenses" value={dummyLicenseData.renewed} />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ background: mutedColors[4], width: '100%' }}>
            <Statistic title="Pending Renewal" value={dummyLicenseData.pendingRenewal} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LicenseStatusCount;
