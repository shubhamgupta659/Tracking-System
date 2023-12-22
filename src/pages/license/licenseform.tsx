import React from 'react';
import { Row, Col, Form, Input, DatePicker, Checkbox, Select, Button, Upload, message, Card } from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import './licensestyle.css';
const { Dragger } = Upload;
const { Option } = Select;

const LicenseForm = () => {
  const onFinish = (values:any) => {
    console.log('Received values:', values);
    // Add logic to handle the form submission
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
      name="myForm"
      initialValues={{ tracked: true, licenseMode: 'User' }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Software Name" name="softwareName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Version" name="version" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Architecture" name="architecture" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="End-of-Life Date" name="eolDate" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={10}>
          <Form.Item label="License Mode" name="licenseMode" rules={[{ required: true }]}>
            <Select>
              <Option value="User">User</Option>
              <Option value="Instance">Instance</Option>
              <Option value="Capacity">Capacity</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item label="Tracked" name="tracked" valuePropName="checked">
            <Checkbox>Tracked</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Server IP" name={['serverInfo', 'ip']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Hostname" name={['serverInfo', 'hostname']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="App Code" name={['ownedBy', 'appCode']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="App Name" name={['ownedBy', 'appName']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Division" name="division" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Seen Date" name="firstSeenDate" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Seen Date" name="lastSeenDate" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} >
      <Form.List name="attestations">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={24} key={key}>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label={name===0 && `Attestation`}
                    name={[name, 'attestationBy']}
                    rules={[{ required: true, message: 'Please input attestationBy' }]}
                  >
                    <Input placeholder="Attestation By" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label={name===0 && `Attestation Date`}
                    name={[name, 'attestationDate']}
                    rules={[{ required: true, message: 'Please input attestationDate' }]}
                  >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }}/>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label={name===0 && `Delta Change Since Attestation`}
                    rules={[{ required: true, message: 'Please input deltaChangeSinceAttestation' }]}
                  >
                    <Input placeholder="Delta Change Since Attestation" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                label={name===0 && ` `}>
                  <Button type="dashed" onClick={() => remove(name) }>
                    Remove
                  </Button>
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Attestation
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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
    </Card></div>
  );
};

export default LicenseForm;
