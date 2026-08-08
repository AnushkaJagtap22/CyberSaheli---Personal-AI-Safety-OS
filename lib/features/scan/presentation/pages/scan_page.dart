import 'package:flutter/material.dart';

class ScanPage extends StatelessWidget {
  const ScanPage({Key? key}) : super(key: key);

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
                'Scan & Analyze',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Check URLs, files, or messages for threats',
                style: TextStyle(
                  color: Color(0xFFB8B8D0),
                  fontSize: 14,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 24),
              _buildScanCard(context, Icons.link, 'Scan URL', 'Check links for phishing', const Color(0xFF6C63FF)),
              const SizedBox(height: 16),
              _buildScanCard(context, Icons.qr_code_scanner, 'Scan QR Code', 'Analyze suspicious QR codes', const Color(0xFF00D68F)),
              const SizedBox(height: 16),
              _buildScanCard(context, Icons.file_present, 'Analyze File', 'Scan images & docs for malware', const Color(0xFFFFB84D)),
              const SizedBox(height: 32),
              const Text(
                'Quick URL Check',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      style: const TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'https://...',
                        hintStyle: const TextStyle(color: Color(0xFFB8B8D0)),
                        filled: true,
                        fillColor: const Color(0xFF1E1E32),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF6C63FF),
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text('Scan', style: TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              const Text(
                'Recent Scans',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              _buildRecentScanItem('http://free-gift-card.xyz', 'Phishing', const Color(0xFFFF6B6B)),
              _buildRecentScanItem('bank-statement.pdf', 'Safe', const Color(0xFF00D68F)),
              _buildRecentScanItem('WhatsApp message', 'Suspicious', const Color(0xFFFFB84D)),
              _buildRecentScanItem('https://amazon.in/offer', 'Safe', const Color(0xFF00D68F)),
              _buildRecentScanItem('QR Code', 'Safe', const Color(0xFF00D68F)),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildScanCard(BuildContext context, IconData icon, String title, String subtitle, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(icon, color: color, size: 32),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Poppins',
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        subtitle,
                        style: const TextStyle(
                          color: Color(0xFFB8B8D0),
                          fontSize: 13,
                          fontFamily: 'Poppins',
                        ),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, color: Color(0xFFB8B8D0), size: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRecentScanItem(String name, String status, Color statusColor) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          const Icon(Icons.history, color: Color(0xFFB8B8D0), size: 20),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              name,
              style: const TextStyle(
                color: Colors.white,
                fontFamily: 'Poppins',
                fontSize: 14,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: statusColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              status,
              style: TextStyle(
                color: statusColor,
                fontSize: 12,
                fontWeight: FontWeight.bold,
                fontFamily: 'Poppins',
              ),
            ),
          ),
        ],
      ),
    );
  }
}
