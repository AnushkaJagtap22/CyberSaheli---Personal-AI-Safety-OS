import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(height: 20),
              // Avatar
              Container(
                width: 100,
                height: 100,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [Color(0xFF6C63FF), Color(0xFFFF66C4)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: const Center(
                  child: Text(
                    'A',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Poppins',
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Anushka Jagtap',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'anushka@example.com',
                style: TextStyle(
                  color: Color(0xFFB8B8D0),
                  fontSize: 14,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF00D68F).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF00D68F).withOpacity(0.3)),
                ),
                child: const Text(
                  'Guardian Level',
                  style: TextStyle(
                    color: Color(0xFF00D68F),
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              // Stats
              Container(
                padding: const EdgeInsets.symmetric(vertical: 20),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E1E32),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildProfileStat('142', 'Scans'),
                    Container(width: 1, height: 40, color: Colors.white12),
                    _buildProfileStat('15', 'Blocked'),
                    Container(width: 1, height: 40, color: Colors.white12),
                    _buildProfileStat('8', 'Reports'),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              
              // Menu
              _buildMenuSection([
                _buildMenuItem(Icons.edit, 'Edit Profile'),
                _buildMenuItem(Icons.settings, 'Settings'),
                _buildMenuItem(Icons.folder_special, 'Evidence Vault'),
              ]),
              const SizedBox(height: 16),
              _buildMenuSection([
                _buildMenuItem(Icons.people, 'Trusted Contacts'),
                _buildMenuItem(Icons.privacy_tip, 'Privacy Settings'),
                _buildMenuItem(Icons.help_outline, 'Help & Support'),
              ]),
              const SizedBox(height: 16),
              _buildMenuSection([
                _buildMenuItem(Icons.logout, 'Logout', isDestructive: true),
              ]),
              
              const SizedBox(height: 24),
              const Text(
                'Version 1.0.0',
                style: TextStyle(
                  color: Colors.white38,
                  fontSize: 12,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfileStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
            fontFamily: 'Poppins',
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(
            color: Color(0xFFB8B8D0),
            fontSize: 12,
            fontFamily: 'Poppins',
          ),
        ),
      ],
    );
  }

  Widget _buildMenuSection(List<Widget> children) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildMenuItem(IconData icon, String title, {bool isDestructive = false}) {
    final color = isDestructive ? const Color(0xFFFF6B6B) : Colors.white;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Row(
            children: [
              Icon(icon, color: color, size: 22),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    color: color,
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
              if (!isDestructive)
                const Icon(Icons.arrow_forward_ios, color: Color(0xFFB8B8D0), size: 14),
            ],
          ),
        ),
      ),
    );
  }
}
