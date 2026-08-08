import 'package:flutter/material.dart';

class SafetyPage extends StatefulWidget {
  const SafetyPage({Key? key}) : super(key: key);

  @override
  State<SafetyPage> createState() => _SafetyPageState();
}

class _SafetyPageState extends State<SafetyPage> {
  final List<bool> _checklist = List.generate(5, (_) => false);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Safety Center',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 24),
              
              // Big SOS Button
              InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(24),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFFFF6B6B), Color(0xFFD32F2F)],
                    ),
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFFF6B6B).withOpacity(0.4),
                        blurRadius: 20,
                        spreadRadius: 2,
                      )
                    ]
                  ),
                  child: const Column(
                    children: [
                      Icon(Icons.warning_amber_rounded, color: Colors.white, size: 48),
                      SizedBox(height: 12),
                      Text(
                        'EMERGENCY SOS',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 2,
                          fontFamily: 'Poppins',
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Tap to alert trusted contacts',
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                          fontFamily: 'Poppins',
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              
              const SizedBox(height: 32),
              const Text(
                'Trusted Contacts',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              _buildContact('Mom', '+91 98765 43210'),
              _buildContact('Dad', '+91 87654 32109'),
              _buildContact('Bestie', '+91 76543 21098'),
              
              const SizedBox(height: 32),
              const Text(
                'Safety Checklist',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              _buildChecklistItem(0, 'Lock your accounts'),
              _buildChecklistItem(1, 'Enable 2FA (Two-Factor Auth)'),
              _buildChecklistItem(2, 'Review privacy settings'),
              _buildChecklistItem(3, 'Check connected apps'),
              _buildChecklistItem(4, 'Update emergency contacts'),
              
              const SizedBox(height: 32),
              const Text(
                'Resources & Helplines',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              _buildHelpline('National Cyber Crime Helpline', '1930'),
              _buildHelpline('Women Helpline', '1091'),
              _buildHelpline('Police', '112'),
              
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContact(String name, String phone) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: const Color(0xFF6C63FF),
            child: Text(name[0], style: const TextStyle(color: Colors.white)),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
                Text(phone, style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12, fontFamily: 'Poppins')),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.call, color: Color(0xFF00D68F)),
            onPressed: () {},
          ),
        ],
      ),
    );
  }

  Widget _buildChecklistItem(int index, String title) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(12),
      ),
      child: CheckboxListTile(
        value: _checklist[index],
        onChanged: (val) {
          setState(() {
            _checklist[index] = val ?? false;
          });
        },
        title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 14, fontFamily: 'Poppins')),
        activeColor: const Color(0xFF6C63FF),
        checkColor: Colors.white,
        controlAffinity: ListTileControlAffinity.leading,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  Widget _buildHelpline(String name, String number) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(name, style: const TextStyle(color: Colors.white, fontFamily: 'Poppins')),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFF6C63FF).withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              number,
              style: const TextStyle(color: Color(0xFF6C63FF), fontWeight: FontWeight.bold, fontFamily: 'Poppins'),
            ),
          ),
        ],
      ),
    );
  }
}
