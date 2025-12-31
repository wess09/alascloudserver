import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../utils/request';

const InstanceManagement = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingInstance, setEditingInstance] = useState(null);
  const [form] = Form.useForm();

  const fetchInstances = async () => {
    setLoading(true);
    try {
      const data = await api.get('/admin/instances');
      setInstances(data);
    } catch (error) {
      console.error('获取实例列表失败', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  const handleCreate = () => {
    setEditingInstance(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingInstance(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除实例 "${record.name}" 吗？`,
      onOk: async () => {
        try {
          await api.delete(`/admin/instances/${record.id}`);
          message.success('删除成功');
          fetchInstances();
        } catch (error) {
          // 错误处理已在拦截器中完成
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingInstance) {
        await api.put(`/admin/instances/${editingInstance.id}`, values);
        message.success('更新成功');
      } else {
        await api.post('/admin/instances', values);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchInstances();
    } catch (error) {
      // 表单验证错误或API错误
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '实例名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>实例管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新建实例
        </Button>
      </div>

      <Table columns={columns} dataSource={instances} rowKey="id" loading={loading} />

      <Modal
        title={editingInstance ? '编辑实例' : '新建实例'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="实例名称" rules={[{ required: true, message: '请输入实例名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="url" label="URL" rules={[{ required: true, message: '请输入实例URL' }, { type: 'url', message: '请输入有效的URL' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InstanceManagement;
