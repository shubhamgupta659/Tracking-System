import React from 'react';
import { Form, Input, DatePicker, Select, InputNumber, Button, Row, Col, Card, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Dragger } = Upload;

const ComplianceForm = () => {
  const onFinish = (values:any) => {
    console.log('Form values:', values);
    // Handle submission logic here
  };

  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload: () => false,
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className='main-view-container'>
    <Card>
      <Form
        labelCol={{ span: 8}}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Cloud Service Provider" name="cloudServiceProvider">
            <Input placeholder="Cloud Service Provider" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Agency" name="agency">
            <Input placeholder="Agency" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tenant Name" name="tenantName">
            <Input placeholder="Tenant Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Account Name" name="accountName">
            <Input placeholder="Account Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Account Number" name="accountNumber">
            <Input placeholder="Account Number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={8}>
          <Form.Item label="Compliant Check" name="compliantCheckCounts">
            <InputNumber type="number" placeholder="Compliant Check" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Non-Compliant Check" name="nonCompliantCheckCounts">
            <InputNumber type="number" placeholder="Non-Compliant Check" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Suppressed Checks" name="suppressedChecksCounts">
            <InputNumber type="number" placeholder="Suppressed Checks" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="App Code / Full Name" name="appCodeFullName">
            <Input placeholder="App Code / Full Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Environment" name="environment">
            <Input placeholder="Environment" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Go Live Date" name="goLiveDate">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Upload Documents" name="uploadDocuments" valuePropName="fileList" getValueFromEvent={normFile}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default ComplianceForm;
