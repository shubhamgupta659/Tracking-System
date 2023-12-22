import React from 'react';
import { Row, Col, Form, Input, DatePicker, Upload, Button, Card, message } from 'antd';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const UtilityForm = () => {
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
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }} // Set both labelCol and wrapperCol to { span: 24 } for full width
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="App Code / Full Name" name="appCodeFullName">
            <Input placeholder="App Code / Full Name" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Fund Status Indicator" name="fundStatusIndicator">
            <Input placeholder="Fund Status Indicator" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Account #" name="accountNumber">
            <Input placeholder="Account #" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Environment" name="environment">
            <Input placeholder="Environment" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      

        <Col span={12}>
          <Form.Item label="Approved Go-Live Date" name="approvedGoLiveDate">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Entered By" name="enteredBy">
            <Input placeholder="Entered By" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={24}>
      <Form.List name="approvedBudgetEntries">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label={name===0 && `Approved Budget`}
                      name={[name, 'approvedBudget']}
                    >
                      <Input placeholder="Approved Budget" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      label={name===0 && `Till When`}
                      name={[name, 'tillWhen']}
                    >
                      <DatePicker placeholder="Till When" style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                  <Form.Item 
                label={name===0 && ` `}>
                   <MinusCircleOutlined onClick={() => remove(name)} />
                </Form.Item>  
                  </Col>
                </Row>
              
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                <PlusOutlined /> Add Approved Budget Entry
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Supporting Documents" name="supportingDocuments" valuePropName="fileList" getValueFromEvent={normFile}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
        </Col>
        {/* Add other Form.Item components */}
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

export default UtilityForm;
