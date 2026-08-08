import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning, Anushka 👋';
    if (hour < 17) return 'Good Afternoon, Anushka 👋';
    return 'Good Evening, Anushka 👋';
  }

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
              // Top Area
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _getGreeting(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Poppins',
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Stay safe today',
                        style: TextStyle(
                          color: Color(0xFFB8B8D0),
                          fontSize: 14,
                          fontFamily: 'Poppins',
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.notifications_none, color: Colors.white),
                        onPressed: () {},
                      ),
                      IconButton(
                        icon: const Icon(Icons.settings_outlined, color: Colors.white),
                        onPressed: () {},
                      ),
                    ],
                  )
                ],
              ).animate().fade(duration: 400.ms).slideY(begin: -0.2, end: 0),
              
              const SizedBox(height: 24),

              // Safety Score Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF6C63FF), Color(0xFF4A44B2)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF6C63FF).withOpacity(0.3),
                      blurRadius: 15,
                      offset: const Offset(0, 8),
                    )
                  ],
                ),
                child: Row(
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 80,
                          height: 80,
                          child: CircularProgressIndicator(
                            value: 0.87,
                            backgroundColor: Colors.white.withOpacity(0.2),
                            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                            strokeWidth: 8,
                          ),
                        ),
                        const Text(
                          '87',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Poppins',
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 24),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Safety Score',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            fontFamily: 'Poppins',
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.check_circle, color: Color(0xFF00D68F), size: 16),
                            const SizedBox(width: 4),
                            Text(
                              'Excellent',
                              style: TextStyle(
                                color: const Color(0xFF00D68F),
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'Poppins',
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withOpacity(0.3),
                                    blurRadius: 2,
                                  )
                                ]
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Last updated: 2 mins ago',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 12,
                            fontFamily: 'Poppins',
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ).animate(delay: 100.ms).fade(duration: 400.ms).scale(),

              const SizedBox(height: 24),

              // AI Status Row
              Row(
                children: [
                  Expanded(
                    child: _buildStatusCard(
                      'AI Guardian',
                      'Monitoring 24/7',
                      Icons.circle,
                      const Color(0xFF00D68F),
                      'Active',
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildStatusCard(
                      'Threats Blocked',
                      'Total secured',
                      Icons.security,
                      const Color(0xFFFF6B6B),
                      '3 Today',
                    ),
                  ),
                ],
              ).animate(delay: 200.ms).fade(duration: 400.ms).slideX(),

              const SizedBox(height: 24),
              const Text(
                'Quick Actions',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ).animate(delay: 300.ms).fade(),
              const SizedBox(height: 16),
              
              // Quick Actions Grid
              GridView.count(
                crossAxisCount: 3,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                children: [
                  _buildActionCard(Icons.face_retouching_off, 'Deepfake\nScanner', const Color(0xFF6C63FF)),
                  _buildActionCard(Icons.chat_bubble_outline, 'Chat\nGuardian', const Color(0xFF00B4D8)),
                  _buildActionCard(Icons.shield_outlined, 'Phishing\nShield', const Color(0xFF00D68F)),
                  _buildActionCard(Icons.search, 'Background\nCheck', const Color(0xFFFFB84D)),
                  _buildActionCard(Icons.folder_special, 'Evidence\nVault', const Color(0xFFFF66C4)),
                  _buildActionCard(Icons.auto_awesome, 'AI\nAssistant', const Color(0xFF00E5FF)),
                ],
              ).animate(delay: 400.ms).fade(duration: 400.ms).slideY(begin: 0.2, end: 0),

              const SizedBox(height: 24),
              
              // Today's Safety Tip
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E1E32),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFFB84D).withOpacity(0.1),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.lightbulb_outline, color: Color(0xFFFFB84D)),
                    ),
                    const SizedBox(width: 16),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Today's Safety Tip",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Poppins',
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            "Never share OTPs with anyone claiming to be from customer support.",
                            style: TextStyle(
                              color: Color(0xFFB8B8D0),
                              fontSize: 12,
                              fontFamily: 'Poppins',
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ).animate(delay: 500.ms).fade().scale(),
              
              const SizedBox(height: 24),
              const Text(
                'Recent Alerts',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ).animate(delay: 600.ms).fade(),
              const SizedBox(height: 16),
              
              // Recent Alerts
              SizedBox(
                height: 120,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    _buildAlertCard('Suspicious URL', 'Phishing attempt blocked', '2 hrs ago', const Color(0xFFFF6B6B)),
                    _buildAlertCard('Deepfake Risk: 73%', 'Detected in latest photo', '5 hrs ago', const Color(0xFFFFB84D)),
                    _buildAlertCard('App Permissions', '3 apps using location', '1 day ago', const Color(0xFF6C63FF)),
                  ],
                ),
              ).animate(delay: 700.ms).fade().slideX(),
              
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusCard(String title, String subtitle, IconData icon, Color color, String value) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 12),
              const SizedBox(width: 8),
              Text(
                value,
                style: TextStyle(
                  color: color,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  fontFamily: 'Poppins',
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.w600,
              fontFamily: 'Poppins',
            ),
          ),
          Text(
            subtitle,
            style: const TextStyle(
              color: Color(0xFFB8B8D0),
              fontSize: 12,
              fontFamily: 'Poppins',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionCard(IconData icon, String label, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: color, size: 28),
                const SizedBox(height: 8),
                Text(
                  label,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 11,
                    fontWeight: FontWeight.w500,
                    fontFamily: 'Poppins',
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAlertCard(String title, String desc, String time, Color color) {
    return Container(
      width: 220,
      margin: const EdgeInsets.only(right: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  title,
                  style: TextStyle(
                    color: color,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Text(
                time,
                style: const TextStyle(
                  color: Color(0xFFB8B8D0),
                  fontSize: 10,
                  fontFamily: 'Poppins',
                ),
              ),
            ],
          ),
          const Spacer(),
          Text(
            desc,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 13,
              fontWeight: FontWeight.w500,
              fontFamily: 'Poppins',
            ),
          ),
        ],
      ),
    );
  }
}
