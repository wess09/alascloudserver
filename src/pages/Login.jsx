import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    setLoading(true);
    // Simulate a slight delay for better UX feeling
    setTimeout(async () => {
      try {
        const success = await login(values.username, values.password);
        if (success) {
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from, { replace: true });
        } else {
             message.error("登录失败，请检查用户名或密码");
        }
      } catch (error) {
        message.error("登录出错");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Fallback or dynamic bg
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        animation: 'float 10s infinite ease-in-out'
      }} />
       <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(50,100,255,0.3) 0%, rgba(50,100,255,0) 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        animation: 'float 15s infinite ease-in-out reverse'
      }} />

      <div className="glass-panel" style={{ 
        width: 420, 
        padding: '48px 32px',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: 32 }}>
            <div style={{ 
                width: 64, 
                height: 64, 
                background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                borderRadius: '16px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(24,144,255,0.3)'
            }}>
                <span style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>A</span>
            </div>
            
          <Title level={2} style={{ marginBottom: 8, letterSpacing: '-0.5px' }}>Alas Cloud Plus</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>欢迎回来，请登录您的账户</Text>
        </div>
        
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
                placeholder="用户名" 
                style={{ 
                    borderRadius: '12px', 
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid transparent'
                }}
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
              placeholder="密码"
              style={{ 
                    borderRadius: '12px', 
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid transparent'
                }}
            />
          </Form.Item>

          <Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                style={{
                    height: '48px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    background: '#007AFF', // Apple Blue
                    boxShadow: '0 4px 12px rgba(0,122,255,0.3)',
                    border: 'none',
                    marginTop: '8px'
                }}
            >
              登 录 <ArrowRightOutlined />
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ marginTop: 24 }}>
            <Text type="secondary" style={{ fontSize: '13px' }}>
                Alas Cloud Plus &copy; {new Date().getFullYear()}
            </Text>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
