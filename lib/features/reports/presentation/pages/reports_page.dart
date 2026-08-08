import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class ReportsPage extends StatelessWidget {
  const ReportsPage({Key? key}) : super(key: key);

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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Insights',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Poppins',
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E1E32),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text('This Week', style: TextStyle(color: Colors.white, fontSize: 12)),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(child: _buildStatCard('Threats\nBlocked', '15', Icons.shield, const Color(0xFFFF6B6B))),
                  const SizedBox(width: 16),
                  Expanded(child: _buildStatCard('Total\nScans', '142', Icons.search, const Color(0xFF00D68F))),
                  const SizedBox(width: 16),
                  Expanded(child: _buildStatCard('Safety\nScore', '+5', Icons.trending_up, const Color(0xFF6C63FF))),
                ],
              ),
              const SizedBox(height: 32),
              const Text(
                'Weekly Threats',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              Container(
                height: 200,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E1E32),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: BarChart(
                  BarChartData(
                    alignment: BarChartAlignment.spaceAround,
                    maxY: 20,
                    barTouchData: BarTouchData(enabled: false),
                    titlesData: FlTitlesData(
                      show: true,
                      bottomTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          getTitlesWidget: (value, meta) {
                            const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                            return Padding(
                              padding: const EdgeInsets.only(top: 8.0),
                              child: Text(days[value.toInt()], style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12)),
                            );
                          },
                        ),
                      ),
                      leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                      topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                      rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    ),
                    borderData: FlBorderData(show: false),
                    barGroups: [
                      _buildBar(0, 5), _buildBar(1, 12), _buildBar(2, 8),
                      _buildBar(3, 15), _buildBar(4, 3), _buildBar(5, 7), _buildBar(6, 2),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              const Text(
                'Recent Activity',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 16),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: 5,
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E1E32),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: const Color(0xFF6C63FF).withOpacity(0.2),
                          child: const Icon(Icons.security, color: Color(0xFF6C63FF), size: 18),
                        ),
                        const SizedBox(width: 16),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Background Scan Completed', style: TextStyle(color: Colors.white, fontSize: 14)),
                              Text('No threats found', style: TextStyle(color: Color(0xFFB8B8D0), fontSize: 12)),
                            ],
                          ),
                        ),
                        const Text('2h ago', style: TextStyle(color: Color(0xFFB8B8D0), fontSize: 12)),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  BarChartGroupData _buildBar(int x, double y) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: y,
          color: const Color(0xFF6C63FF),
          width: 12,
          borderRadius: BorderRadius.circular(4),
          backDrawRodData: BackgroundBarChartRodData(
            show: true,
            toY: 20,
            color: const Color(0xFF1A1A2E),
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E32),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 12),
          Text(
            value,
            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Poppins'),
          ),
          Text(
            title,
            style: const TextStyle(color: Color(0xFFB8B8D0), fontSize: 12, fontFamily: 'Poppins'),
          ),
        ],
      ),
    );
  }
}
