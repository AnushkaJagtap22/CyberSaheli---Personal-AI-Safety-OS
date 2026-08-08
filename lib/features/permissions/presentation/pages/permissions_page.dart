import 'package:flutter/material.dart';

class PermissionsPage extends StatefulWidget {
  const PermissionsPage({super.key});

  @override
  State<PermissionsPage> createState() => _PermissionsPageState();
}

class _PermissionsPageState extends State<PermissionsPage> {
  Map<String, bool> granted = {
    'Camera': false,
    'Notifications': false,
    'Storage': false,
    'Microphone': false,
    'Contacts': false,
    'Location': false,
  };

  bool get _canContinue => granted['Camera']! && granted['Notifications']!;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 40),
            const Text(
              'Quick Setup',
              style: TextStyle(
                color: Colors.white,
                fontSize: 28,
                fontWeight: FontWeight.bold,
                fontFamily: 'Poppins',
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Grant these permissions for full protection',
              style: TextStyle(color: Color(0xFFB8B8D0), fontSize: 16),
            ),
            const SizedBox(height: 32),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  _buildPermCard('Camera', Icons.camera_alt, 'Required for deepfake detection', true),
                  _buildPermCard('Notifications', Icons.notifications, 'Required for instant threat alerts', true),
                  _buildPermCard('Storage', Icons.folder, 'Required for evidence vault', false),
                  _buildPermCard('Microphone', Icons.mic, 'Required for voice analysis', false),
                  _buildPermCard('Contacts', Icons.contacts, 'Optional, for SOS trusted contacts', false),
                  _buildPermCard('Location', Icons.location_on, 'Optional, for SOS live tracking', false),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _canContinue ? const Color(0xFF6C63FF) : Colors.grey[800],
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: _canContinue ? () {} : null,
                      child: const Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextButton(
                    onPressed: () {},
                    child: const Text('Skip for now', style: TextStyle(color: Color(0xFFB8B8D0))),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildPermCard(String name, IconData icon, String desc, bool isRequired) {
    final isGranted = granted[name]!;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isGranted ? const Color(0xFF00D68F) : Colors.white10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: isGranted ? const Color(0xFF00D68F).withOpacity(0.2) : Colors.white10,
            child: Icon(icon, color: isGranted ? const Color(0xFF00D68F) : Colors.white),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                    if (isRequired) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: const Color(0xFFFF6B6B).withOpacity(0.2), borderRadius: BorderRadius.circular(4)),
                        child: const Text('REQUIRED', style: TextStyle(color: Color(0xFFFF6B6B), fontSize: 10, fontWeight: FontWeight.bold)),
                      )
                    ]
                  ],
                ),
                const SizedBox(height: 4),
                Text(desc, style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12)),
              ],
            ),
          ),
          Switch(
            value: isGranted,
            activeColor: const Color(0xFF00D68F),
            onChanged: (val) {
              setState(() => granted[name] = val);
            },
          )
        ],
      ),
    );
  }
}
