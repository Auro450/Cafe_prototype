import React from 'react';
import { ShoppingBag, Download, Clock, CheckCircle, Trash2 } from 'lucide-react';

const OrdersPage = ({ orders = [], onDeleteOrder }) => {
  if (orders.length === 0) {
    return (
      <div style={{ padding: '24px', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#ffe5e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-red, #E60000)' }}>
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>No Orders Yet</h2>
        <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.5 }}>Looks like you haven't placed any orders yet. Head back to the menu to find something delicious!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>My Orders</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '80px' }}>
        {orders.map((order) => {
          const isCompleted = order.status === 'Completed';
          return (
            <div key={order.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222' }}>{order.id}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>
                    {order.date} • <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#444' }}>{order.type}</span>
                  </p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 700,
                    background: isCompleted ? '#eef8e6' : '#fff4e5',
                    color: isCompleted ? '#3a7d00' : '#e6a600'
                  }}>
                    {isCompleted ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {order.status}
                  </div>
                  
                  <button 
                    onClick={() => onDeleteOrder && onDeleteOrder(order.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4d4d',
                      cursor: 'pointer',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      transition: 'background 0.2s'
                    }}
                    title="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div style={{ marginBottom: '16px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#444', marginBottom: '8px' }}>
                    <span>{item.quantity} x {item.name}</span>
                    <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px dashed #eee' }}>
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Total Amount</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#222' }}>₹{order.totalAmount}</p>
                </div>

                <a 
                  href={order.billUrl || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!order.billUrl || order.billUrl === '#') {
                      e.preventDefault();
                      if (order.billUrl === '#') alert('This is a dummy completed order. In a real app, this would download a PDF bill.');
                    }
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    padding: '10px 16px', 
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: order.billUrl ? '#f0f4ff' : '#f5f5f5',
                    color: order.billUrl ? '#0066ff' : '#aaa',
                    pointerEvents: order.billUrl ? 'auto' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Download size={16} />
                  Download Bill
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
