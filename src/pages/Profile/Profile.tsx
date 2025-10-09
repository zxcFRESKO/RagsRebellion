import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeatherIcons } from '../../hooks/useFeatherIcons';
import { classNames } from '../../utils/helpers';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  useFeatherIcons();
  const { user, updateUser, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (): void => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancelEdit = (): void => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user?.username || ''
    });
    setIsEditing(false);
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2023-12-15',
      status: 'delivered',
      total: 149.97,
      items: [
        { name: 'Viper Black Tee', quantity: 1, price: 49.99 },
        { name: 'Swag Hoodie', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2023-11-20',
      status: 'processing',
      total: 59.99,
      items: [
        { name: 'Viper Joggers', quantity: 1, price: 59.99 }
      ]
    }
  ];

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.notAuthenticated}>
            <h2>Please sign in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        
        {/* Заголовок страницы */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Account</h1>
          <p className={styles.welcomeMessage}>
            Welcome back, {user.firstName}!
          </p>
        </div>

        <div className={styles.profileContent}>
          
          {/* Боковая навигация */}
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <button
                className={classNames(
                  styles.navItem,
                  activeTab === 'profile' && styles.navItemActive
                )}
                onClick={() => setActiveTab('profile')}
              >
                <i data-feather="user" className={styles.navIcon}></i>
                Profile Information
              </button>
              <button
                className={classNames(
                  styles.navItem,
                  activeTab === 'orders' && styles.navItemActive
                )}
                onClick={() => setActiveTab('orders')}
              >
                <i data-feather="package" className={styles.navIcon}></i>
                Order History
              </button>
              <button
                className={classNames(
                  styles.navItem,
                  activeTab === 'addresses' && styles.navItemActive
                )}
                onClick={() => setActiveTab('addresses')}
              >
                <i data-feather="map-pin" className={styles.navIcon}></i>
                Saved Addresses
              </button>
              <button 
                className={classNames(styles.navItem, styles.logoutButton)}
                onClick={logout}
              >
                <i data-feather="log-out" className={styles.navIcon}></i>
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Основной контент */}
          <main className={styles.mainContent}>
            
            {/* Вкладка профиля */}
            {activeTab === 'profile' && (
              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Profile Information</h2>
                  {!isEditing ? (
                    <button 
                      className={styles.editButton}
                      onClick={() => setIsEditing(true)}
                    >
                      <i data-feather="edit" className={styles.editIcon}></i>
                      Edit Profile
                    </button>
                  ) : (
                    <div className={styles.editActions}>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button 
                        className={styles.saveButton}
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.profileForm}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка заказов */}
            {activeTab === 'orders' && (
              <div className={styles.ordersSection}>
                <h2 className={styles.sectionTitle}>Order History</h2>
                
                {orders.length === 0 ? (
                  <div className={styles.noOrders}>
                    <i data-feather="package" className={styles.noOrdersIcon}></i>
                    <h3>No orders yet</h3>
                    <p>When you place orders, they will appear here.</p>
                    <button 
                      className={styles.shopButton}
                      onClick={() => window.location.href = '/shop'}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className={styles.ordersList}>
                    {orders.map(order => (
                      <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                          <div className={styles.orderInfo}>
                            <h4 className={styles.orderId}>Order #{order.id}</h4>
                            <p className={styles.orderDate}>
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={styles.orderStatus}>
                            <span className={classNames(
                              styles.statusBadge,
                              styles[`status-${order.status}`]
                            )}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className={styles.orderItems}>
                          {order.items.map((item, index) => (
                            <div key={index} className={styles.orderItem}>
                              <span className={styles.itemName}>{item.name}</span>
                              <span className={styles.itemDetails}>
                                Qty: {item.quantity} • ${item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className={styles.orderFooter}>
                          <div className={styles.orderTotal}>
                            Total: ${order.total}
                          </div>
                          <button className={styles.viewOrderButton}>
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Вкладка адресов */}
            {activeTab === 'addresses' && (
              <div className={styles.addressesSection}>
                <h2 className={styles.sectionTitle}>Saved Addresses</h2>
                
                <div className={styles.addressesGrid}>
                  <div className={styles.addressCard}>
                    <h4 className={styles.addressTitle}>Primary Address</h4>
                    <p className={styles.addressText}>
                      {user.firstName} {user.lastName}<br />
                      123 Main Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <div className={styles.addressActions}>
                      <button className={styles.editAddressButton}>
                        <i data-feather="edit"></i> Edit
                      </button>
                      <button className={styles.deleteAddressButton}>
                        <i data-feather="trash-2"></i> Delete
                      </button>
                    </div>
                  </div>
                  
                  <button className={styles.addAddressCard}>
                    <i data-feather="plus" className={styles.addIcon}></i>
                    <span>Add New Address</span>
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

export default Profile;