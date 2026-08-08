import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool pushEnabled = true;
  bool threatsEnabled = true;
  bool weeklyEnabled = false;
  bool bioAuth = false;
  bool appLock = true;
  bool aiFeatures = true;
  bool dataCollection = false;
  bool darkMode = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Settings', style: TextStyle(color: Colors.white, fontFamily: 'Poppins')),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildProfileCard(),
          const SizedBox(height: 24),
          _buildSectionHeader('Account'),
          _buildListTile('Edit Profile', Icons.person_outline),
          _buildListTile('Change Password', Icons.lock_outline),
          _buildListTile('Trusted Contacts', Icons.people_outline),
          _buildListTile('Emergency Contacts', Icons.emergency),
          
          _buildSectionHeader('AI & Privacy'),
          _buildSwitchTile('AI Preferences', Icons.smart_toy, aiFeatures, (v) => setState(() => aiFeatures = v)),
          _buildListTile('Privacy Settings', Icons.privacy_tip_outlined),
          _buildSwitchTile('Data Collection', Icons.data_usage, dataCollection, (v) => setState(() => dataCollection = v)),
          _buildListTile('Analytics opt-out', Icons.analytics_outlined),

          _buildSectionHeader('Notifications'),
          _buildSwitchTile('Push Notifications', Icons.notifications_none, pushEnabled, (v) => setState(() => pushEnabled = v)),
          _buildSwitchTile('Threat Alerts', Icons.warning_amber, threatsEnabled, (v) => setState(() => threatsEnabled = v)),
          _buildSwitchTile('Weekly Report', Icons.calendar_today, weeklyEnabled, (v) => setState(() => weeklyEnabled = v)),
          _buildSwitchTile('Emergency Alerts', Icons.crisis_alert, true, null),

          _buildSectionHeader('Appearance'),
          _buildSwitchTile('Dark Mode', Icons.dark_mode, darkMode, (v) => setState(() => darkMode = v)),
          _buildListTile('Language', Icons.language, trailing: const Text('English', style: TextStyle(color: Color(0xFFB8B8D0)))),

          _buildSectionHeader('Security'),
          _buildSwitchTile('Biometric Auth', Icons.fingerprint, bioAuth, (v) => setState(() => bioAuth = v)),
          _buildSwitchTile('App Lock', Icons.lock_clock, appLock, (v) => setState(() => appLock = v)),
          _buildListTile('Change PIN', Icons.pin),
          _buildListTile('Security Center', Icons.security),

          _buildSectionHeader('Data'),
          _buildListTile('Backup & Restore', Icons.backup),
          _buildListTile('Export My Data', Icons.file_download),
          _buildListTile('Clear Cache', Icons.cleaning_services),
          ListTile(
            leading: const Icon(Icons.delete_forever, color: Color(0xFFFF6B6B)),
            title: const Text('Delete Account', style: TextStyle(color: Color(0xFFFF6B6B))),
            onTap: () {},
          ),

          _buildSectionHeader('About'),
          _buildListTile('Help & Support', Icons.help_outline),
          _buildListTile('Privacy Policy', Icons.policy_outlined),
          _buildListTile('Terms of Service', Icons.description_outlined),
          _buildListTile('About CyberSaheli', Icons.info_outline),
          _buildListTile('Rate Us', Icons.star_outline),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 24),
            child: Center(
              child: Text('App Version: 1.0.0', style: TextStyle(color: const Color(0xFFB8B8D0).withOpacity(0.5))),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildProfileCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 30,
            backgroundImage: NetworkImage('https://i.pravatar.cc/150?img=47'),
          ),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Anushka Jagtap', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              SizedBox(height: 4),
              Text('anushka@example.com', style: TextStyle(color: Color(0xFFB8B8D0))),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 24, bottom: 8, left: 8),
      child: Text(
        title.toUpperCase(),
        style: const TextStyle(
          color: Color(0xFF6C63FF),
          fontSize: 12,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.5,
        ),
      ),
    );
  }

  Widget _buildListTile(String title, IconData icon, {Widget? trailing}) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 8),
      leading: Icon(icon, color: const Color(0xFFB8B8D0)),
      title: Text(title, style: const TextStyle(color: Colors.white)),
      trailing: trailing ?? const Icon(Icons.chevron_right, color: Color(0xFFB8B8D0)),
      onTap: () {},
    );
  }

  Widget _buildSwitchTile(String title, IconData icon, bool value, Function(bool)? onChanged) {
    return SwitchListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 8),
      secondary: Icon(icon, color: const Color(0xFFB8B8D0)),
      title: Text(title, style: const TextStyle(color: Colors.white)),
      value: value,
      activeColor: const Color(0xFF6C63FF),
      onChanged: onChanged,
    );
  }
}
