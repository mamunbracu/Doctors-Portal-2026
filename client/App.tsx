import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { NotificationProvider } from './components/ui/Notification';
import { PortalSettingsProvider } from './context/PortalSettingsContext';
import { AuthProvider, RequireAuth } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { Overview } from './pages/dashboard/Overview';
import { FindDoctors } from './pages/dashboard/FindDoctors';
import { Appointments } from './pages/dashboard/Appointments';
import { HealthRecords } from './pages/dashboard/HealthRecords';
import { Prescriptions } from './pages/dashboard/Prescriptions';
import { Messages } from './pages/dashboard/Messages';
import { Settings } from './pages/dashboard/Settings';

// Doctor Pages
import { DoctorOverview } from './pages/doctor/Overview';
import { DoctorSchedule } from './pages/doctor/Schedule';
import { DoctorPatients } from './pages/doctor/Patients';
import { DoctorAvailability } from './pages/doctor/Availability';
import { DoctorRecords } from './pages/doctor/Records';
import { DoctorMessages } from './pages/doctor/Messages';
import { DoctorAnalytics } from './pages/doctor/Analytics';
import { DoctorSettings } from './pages/doctor/Settings';

// Staff Pages
import { StaffOverview } from './pages/staff/Overview';
import { StaffAppointments } from './pages/staff/Appointments';
import { StaffSchedule } from './pages/staff/Schedule';
import { StaffPatients } from './pages/staff/Patients';
import { StaffDoctors } from './pages/staff/Doctors';
import { StaffMessages } from './pages/staff/Messages';
import { StaffReports } from './pages/staff/Reports';

// Admin Pages
import { AdminOverview } from './pages/admin/Overview';
import { AdminDoctors } from './pages/admin/Doctors';
import { AdminPatients } from './pages/admin/Patients';
import { AdminStaff } from './pages/admin/Staff';
import { AdminAppointments } from './pages/admin/Appointments';
import { AdminAdvertisements } from './pages/admin/Advertisements';
import { AdminPortalSettings } from './pages/admin/PortalSettings';
import { AdminFooterContent } from './pages/admin/FooterContent';
import { AdminPagesContent } from './pages/admin/PagesContent';
import { AdminAnalytics } from './pages/admin/Analytics';
import { AdminSettings } from './pages/admin/Settings';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFound } from './pages/NotFound';
import { ErrorPage } from './pages/ErrorPage';
import { useAuth } from './context/AuthContext';

// Role-based component switchers
const RoleBasedOverview = () => {
  const { role } = useAuth();
  if (role === 'admin') return <AdminOverview />;
  if (role === 'doctor') return <DoctorOverview />;
  if (role === 'staff') return <StaffOverview />;
  return <Overview />;
};

const RoleBasedMessages = () => {
  const { role } = useAuth();
  if (role === 'admin') return <Navigate to="/dashboard/overview" replace />; // Admin doesn't have messages for now
  if (role === 'doctor') return <DoctorMessages />;
  if (role === 'staff') return <StaffMessages />;
  return <Messages />;
};

const RoleBasedSettings = () => {
  const { role } = useAuth();
  if (role === 'admin') return <AdminSettings />;
  if (role === 'doctor') return <DoctorSettings />;
  return <Settings />;
};

// Mock Landing Page component was here, replaced by LandingPage component

export default function App() {
  return (
    <BrowserRouter>
      <PortalSettingsProvider>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <PublicLayout>
                    <LandingPage />
                  </PublicLayout>
                } />
                <Route path="/login" element={
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                } />
                <Route path="/register" element={
                  <PublicLayout>
                    <RegisterPage />
                  </PublicLayout>
                } />

                {/* Dashboard Routes */}
                <Route path="/dashboard/*" element={
                  <RequireAuth>
                    <DashboardLayout>
                      <Routes>
                        <Route index element={<Navigate to="overview" replace />} />
                        
                        {/* Shared/Role-based Routes */}
                        <Route path="overview" element={<RoleBasedOverview />} />
                        <Route path="messages" element={<RoleBasedMessages />} />
                        <Route path="settings" element={<RoleBasedSettings />} />
                        
                        {/* Patient Specific Routes */}
                        <Route path="find-doctors" element={<FindDoctors />} />
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="health-records" element={<HealthRecords />} />
                        <Route path="prescriptions" element={<Prescriptions />} />
                        
                        {/* Doctor Specific Routes */}
                        <Route path="schedule" element={<DoctorSchedule />} />
                        <Route path="patients" element={<DoctorPatients />} />
                        <Route path="availability" element={<DoctorAvailability />} />
                        <Route path="records" element={<DoctorRecords />} />
                        <Route path="analytics" element={<DoctorAnalytics />} />
                        
                        {/* Staff Specific Routes */}
                        <Route path="staff-appointments" element={<StaffAppointments />} />
                        <Route path="staff-schedule" element={<StaffSchedule />} />
                        <Route path="staff-patients" element={<StaffPatients />} />
                        <Route path="staff-doctors" element={<StaffDoctors />} />
                        <Route path="staff-reports" element={<StaffReports />} />
                        
                        {/* Admin Specific Routes */}
                        <Route path="admin-doctors" element={<AdminDoctors />} />
                        <Route path="admin-patients" element={<AdminPatients />} />
                        <Route path="admin-staff" element={<AdminStaff />} />
                        <Route path="admin-appointments" element={<AdminAppointments />} />
                        <Route path="admin-advertisements" element={<AdminAdvertisements />} />
                        <Route path="admin-portal-settings" element={<AdminPortalSettings />} />
                        <Route path="admin-footer-content" element={<AdminFooterContent />} />
                        <Route path="admin-pages-content" element={<AdminPagesContent />} />
                        <Route path="admin-analytics" element={<AdminAnalytics />} />
                        
                        {/* Generic/Old Dashboard for compatibility */}
                        <Route path="old" element={<Dashboard />} />
                      </Routes>
                    </DashboardLayout>
                  </RequireAuth>
                } />

                {/* Error & Not Found */}
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </PortalSettingsProvider>
    </BrowserRouter>
  );
}
