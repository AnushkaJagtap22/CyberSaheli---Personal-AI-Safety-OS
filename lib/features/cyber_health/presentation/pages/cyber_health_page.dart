import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';

class CyberHealthPage extends ConsumerStatefulWidget {
  const CyberHealthPage({super.key});

  @override
  ConsumerState<CyberHealthPage> createState() => _CyberHealthPageState();
}

class _CyberHealthPageState extends ConsumerState<CyberHealthPage> {
  bool isWeekly = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Cyber Health', style: TextStyle(color: Colors.white, fontFamily: 'Poppins')),
        actions: [
          IconButton(
            icon: const Icon(Icons.download, color: Colors.white),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildToggle(),
            const SizedBox(height: 24),
            _buildScore(),
            const SizedBox(height: 24),
            _buildStatsGrid(),
            const SizedBox(height: 24),
            _buildCharts(),
            const SizedBox(height: 24),
            _buildInsights(),
            const SizedBox(height: 24),
            _buildRecommendations(),
          ],
        ),
      ),
    );
  }

  Widget _buildToggle() {
    return Center(
      child: Container(
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E32),
          borderRadius: BorderRadius.circular(30),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildTab('Weekly', isWeekly),
            _buildTab('Monthly', !isWeekly),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(String title, bool active) {
    return GestureDetector(
      onTap: () => setState(() => isWeekly = title == 'Weekly'),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        decoration: BoxDecoration(
          color: active ? const Color(0xFF6C63FF) : Colors.transparent,
          borderRadius: BorderRadius.circular(30),
        ),
        child: Text(
          title,
          style: TextStyle(
            color: active ? Colors.white : const Color(0xFFB8B8D0),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _buildScore() {
    return Center(
      child: Column(
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: Stack(
              fit: StackFit.expand,
              children: [
                CircularProgressIndicator(
                  value: 0.87,
                  strokeWidth: 12,
                  backgroundColor: const Color(0xFF1E1E32),
                  valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF00D68F)),
                ),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text('87', style: TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.bold)),
                      Text('Excellent', style: TextStyle(color: Color(0xFF00D68F), fontSize: 14)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.arrow_upward, color: Color(0xFF00D68F), size: 16),
              SizedBox(width: 4),
              Text('+5 this week', style: TextStyle(color: Color(0xFF00D68F))),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatsGrid() {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 1.5,
      children: [
        _buildStatCard('Scams Prevented', '12', Icons.shield, const Color(0xFF6C63FF)),
        _buildStatCard('Links Analyzed', '47', Icons.link, const Color(0xFF00D68F)),
        _buildStatCard('Chats Analyzed', '8', Icons.chat, const Color(0xFFFFB84D)),
        _buildStatCard('Reports Gen', '3', Icons.article, const Color(0xFFB8B8D0)),
      ],
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(width: 8),
              Text(value, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildCharts() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(20),
      ),
      height: 250,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Weekly Safety Trend', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 24),
          Expanded(
            child: BarChart(
              BarChartData(
                alignment: BarChartAlignment.spaceAround,
                maxY: 10,
                barTouchData: BarTouchData(enabled: true),
                titlesData: FlTitlesData(
                  show: true,
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (value, meta) {
                        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                        return Text(days[value.toInt()], style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12));
                      },
                    ),
                  ),
                  leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                ),
                gridData: FlGridData(show: false),
                borderData: FlBorderData(show: false),
                barGroups: [
                  for (int i = 0; i < 7; i++)
                    BarChartGroupData(
                      x: i,
                      barRods: [
                        BarChartRodData(
                          toY: (i % 3 + 2).toDouble(),
                          color: const Color(0xFF6C63FF),
                          width: 16,
                          borderRadius: BorderRadius.circular(4),
                        )
                      ],
                    )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInsights() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('AI Insights', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        _buildInsightRow(Icons.access_time, 'Peak threat time: 10 PM - 12 AM'),
        const SizedBox(height: 8),
        _buildInsightRow(Icons.bug_report, 'Most common threat: Phishing URLs'),
        const SizedBox(height: 8),
        _buildInsightRow(Icons.trending_down, 'Your risk reduced by 23% this month'),
      ],
    );
  }

  Widget _buildInsightRow(IconData icon, String text) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(icon, color: const Color(0xFF6C63FF), size: 20),
          const SizedBox(width: 12),
          Expanded(child: Text(text, style: const TextStyle(color: Colors.white70))),
        ],
      ),
    );
  }

  Widget _buildRecommendations() {
    final tips = [
      'Enable 2FA on your Instagram',
      'Review connected apps on Google',
      'Update your device OS',
      'Avoid sharing location on Snapchat',
      'Check privacy settings on Facebook'
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Safety Recommendations', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        ...tips.map((tip) => Padding(
          padding: const EdgeInsets.only(bottom: 8.0),
          child: Row(
            children: [
              const Icon(Icons.check_circle_outline, color: Color(0xFF00D68F), size: 20),
              const SizedBox(width: 12),
              Expanded(child: Text(tip, style: const TextStyle(color: Colors.white70))),
            ],
          ),
        )),
      ],
    );
  }
}
