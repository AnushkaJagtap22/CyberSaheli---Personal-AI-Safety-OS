import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:async';

class SosPage extends ConsumerStatefulWidget {
  const SosPage({super.key});

  @override
  ConsumerState<SosPage> createState() => _SosPageState();
}

class _SosPageState extends ConsumerState<SosPage>
    with SingleTickerProviderStateMixin {
  bool isSosActive = false;
  bool silentMode = false;
  bool shareLocation = false;
  late AnimationController _pulseController;
  Timer? _holdTimer;
  double _holdProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _holdTimer?.cancel();
    super.dispose();
  }

  void _startHold() {
    if (isSosActive) return;
    _holdProgress = 0.0;
    _holdTimer = Timer.periodic(const Duration(milliseconds: 50), (timer) {
      setState(() {
        _holdProgress += 0.025; // 2 seconds total
        if (_holdProgress >= 1.0) {
          _holdTimer?.cancel();
          _activateSos();
        }
      });
    });
  }

  void _cancelHold() {
    if (isSosActive) return;
    _holdTimer?.cancel();
    setState(() {
      _holdProgress = 0.0;
    });
  }

  void _activateSos() {
    setState(() {
      isSosActive = true;
      _holdProgress = 1.0;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('SOS ACTIVATED', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.redAccent,
        duration: Duration(seconds: 3),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: isSosActive
                ? [const Color(0xFF4A0000), const Color(0xFFFF0000)]
                : [const Color(0xFF1A0A0A), const Color(0xFF2A0000)],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(context),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    children: [
                      Text(
                        isSosActive ? 'SOS Active' : 'All Clear',
                        style: TextStyle(
                          color: isSosActive ? Colors.white : Colors.greenAccent,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 40),
                      _buildSosButton(),
                      const SizedBox(height: 40),
                      _buildToggles(),
                      const SizedBox(height: 24),
                      _buildQuickActions(),
                      const SizedBox(height: 24),
                      _buildTrustedContacts(),
                      const SizedBox(height: 24),
                      _buildChecklist(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
          const Expanded(
            child: Text(
              'Emergency SOS',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.bold,
                fontFamily: 'Poppins',
              ),
            ),
          ),
          const SizedBox(width: 48),
        ],
      ),
    );
  }

  Widget _buildSosButton() {
    return GestureDetector(
      onTapDown: (_) => _startHold(),
      onTapUp: (_) => _cancelHold(),
      onTapCancel: () => _cancelHold(),
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (!isSosActive)
            ...List.generate(3, (index) {
              return AnimatedBuilder(
                animation: _pulseController,
                builder: (context, child) {
                  double progress = (_pulseController.value + (index * 0.33)) % 1.0;
                  return Container(
                    width: 200 + (progress * 100),
                    height: 200 + (progress * 100),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: Colors.red.withOpacity(1 - progress),
                        width: 2,
                      ),
                    ),
                  );
                },
              );
            }),
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: isSosActive
                    ? [Colors.white, Colors.red]
                    : [Colors.redAccent, const Color(0xFF8B0000)],
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.red.withOpacity(0.5),
                  blurRadius: 30,
                  spreadRadius: 10,
                ),
              ],
            ),
            alignment: Alignment.center,
            child: Stack(
              alignment: Alignment.center,
              children: [
                if (_holdProgress > 0 && !isSosActive)
                  CircularProgressIndicator(
                    value: _holdProgress,
                    valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                    strokeWidth: 8,
                  ),
                Text(
                  isSosActive ? 'SOS\nACTIVE' : 'HOLD\nFOR SOS',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildToggles() {
    return Column(
      children: [
        SwitchListTile(
          title: const Text('Silent SOS', style: TextStyle(color: Colors.white)),
          subtitle: const Text('Send SOS without sound or alert', style: TextStyle(color: Colors.white70)),
          value: silentMode,
          activeColor: Colors.redAccent,
          onChanged: (val) => setState(() => silentMode = val),
        ),
        SwitchListTile(
          title: const Text('Share Location', style: TextStyle(color: Colors.white)),
          subtitle: const Text('Share Live Location with trusted contacts', style: TextStyle(color: Colors.white70)),
          value: shareLocation,
          activeColor: Colors.redAccent,
          onChanged: (val) => setState(() => shareLocation = val),
        ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildActionBtn('Police', '112', Icons.local_police),
        _buildActionBtn('Women', '1091', Icons.woman),
        _buildActionBtn('Emergency', '100', Icons.emergency),
      ],
    );
  }

  Widget _buildActionBtn(String label, String number, IconData icon) {
    return Column(
      children: [
        CircleAvatar(
          radius: 30,
          backgroundColor: Colors.white10,
          child: Icon(icon, color: Colors.white, size: 30),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(color: Colors.white70)),
        Text(number, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildTrustedContacts() {
    final contacts = [
      {'name': 'Mom', 'rel': 'Mother', 'avatar': 'M'},
      {'name': 'Priya', 'rel': 'Friend', 'avatar': 'P'},
      {'name': 'Riya', 'rel': 'Sister', 'avatar': 'R'},
    ];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Trusted Contacts', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              TextButton(onPressed: () {}, child: const Text('Manage', style: TextStyle(color: Colors.redAccent))),
            ],
          ),
          ...contacts.map((c) => ListTile(
                leading: CircleAvatar(backgroundColor: Colors.red.withOpacity(0.2), child: Text(c['avatar']!, style: const TextStyle(color: Colors.white))),
                title: Text(c['name']!, style: const TextStyle(color: Colors.white)),
                subtitle: Text(c['rel']!, style: const TextStyle(color: Colors.white70)),
                trailing: IconButton(icon: const Icon(Icons.call, color: Colors.greenAccent), onPressed: () {}),
              )),
        ],
      ),
    );
  }

  Widget _buildChecklist() {
    final items = ['I am safe', 'I need help', 'Follow me', 'I am being followed'];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Quick Updates', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: items.map((item) => ActionChip(
              label: Text(item),
              backgroundColor: Colors.white10,
              labelStyle: const TextStyle(color: Colors.white),
              onPressed: () {},
            )).toList(),
          ),
        ],
      ),
    );
  }
}
