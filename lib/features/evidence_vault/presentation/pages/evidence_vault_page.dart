import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'dart:ui';

class AppColors {
  static const primary = Color(0xFF6C63FF);
  static const background = Color(0xFF0F0F1A);
  static const surface = Color(0xFF1E1E32);
  static const surfaceLight = Color(0xFF252542);
  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFFB8B8D0);
  static const success = Color(0xFF00D68F);
  static const warning = Color(0xFFFFB84D);
  static const danger = Color(0xFFFF6B6B);
}

class EvidenceItem {
  final String id;
  final String title;
  final String type;
  final String date;
  final String size;
  final String status;

  EvidenceItem({
    required this.id,
    required this.title,
    required this.type,
    required this.date,
    required this.size,
    required this.status,
  });
}

class EvidenceVaultState {
  final bool isUnlocked;
  final String selectedFilter;
  final List<EvidenceItem> items;
  final Set<String> selectedItems;
  final bool isSelectMode;

  EvidenceVaultState({
    this.isUnlocked = false,
    this.selectedFilter = 'All',
    this.items = const [],
    this.selectedItems = const {},
    this.isSelectMode = false,
  });

  EvidenceVaultState copyWith({
    bool? isUnlocked,
    String? selectedFilter,
    List<EvidenceItem>? items,
    Set<String>? selectedItems,
    bool? isSelectMode,
  }) {
    return EvidenceVaultState(
      isUnlocked: isUnlocked ?? this.isUnlocked,
      selectedFilter: selectedFilter ?? this.selectedFilter,
      items: items ?? this.items,
      selectedItems: selectedItems ?? this.selectedItems,
      isSelectMode: isSelectMode ?? this.isSelectMode,
    );
  }
}

class EvidenceVaultNotifier extends StateNotifier<EvidenceVaultState> {
  EvidenceVaultNotifier() : super(EvidenceVaultState(
    items: [
      EvidenceItem(id: '1', title: 'Chat Screenshot - 2026-08-01.jpg', type: 'Screenshots', date: 'Aug 1, 2026', size: '2.4 MB', status: 'Encrypted'),
      EvidenceItem(id: '2', title: 'Phishing URL Report', type: 'URLs', date: 'Jul 28, 2026', size: '12 KB', status: 'Secured'),
      EvidenceItem(id: '3', title: 'Deepfake Evidence #1', type: 'Reports', date: 'Jul 15, 2026', size: '15.1 MB', status: 'Encrypted'),
      EvidenceItem(id: '4', title: 'Blackmail Chat Export', type: 'Chats', date: 'Jun 30, 2026', size: '4.2 MB', status: 'Encrypted'),
    ],
  ));

  void unlock() async {
    // Mock biometric delay
    await Future.delayed(const Duration(seconds: 1));
    state = state.copyWith(isUnlocked: true);
  }

  void setFilter(String filter) {
    state = state.copyWith(selectedFilter: filter);
  }

  void toggleSelection(String id) {
    final newSelected = Set<String>.from(state.selectedItems);
    if (newSelected.contains(id)) {
      newSelected.remove(id);
    } else {
      newSelected.add(id);
    }
    state = state.copyWith(
      selectedItems: newSelected,
      isSelectMode: newSelected.isNotEmpty,
    );
  }

  void clearSelection() {
    state = state.copyWith(selectedItems: {}, isSelectMode: false);
  }
}

final vaultProvider = StateNotifierProvider<EvidenceVaultNotifier, EvidenceVaultState>((ref) {
  return EvidenceVaultNotifier();
});

class EvidenceVaultPage extends ConsumerWidget {
  const EvidenceVaultPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(vaultProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: state.isUnlocked ? _buildVaultAppBar(context, ref, state) : null,
      body: state.isUnlocked ? _buildVaultContent(ref, state) : _buildLockScreen(ref),
      floatingActionButton: state.isUnlocked && !state.isSelectMode 
          ? FloatingActionButton.extended(
              onPressed: () {},
              backgroundColor: AppColors.primary,
              icon: const Icon(Icons.add, color: Colors.white),
              label: const Text('Add Evidence', style: TextStyle(color: Colors.white, fontFamily: 'Poppins')),
            ).animate().scale(delay: 400.ms, curve: Curves.easeOutBack)
          : null,
    );
  }

  PreferredSizeWidget _buildVaultAppBar(BuildContext context, WidgetRef ref, EvidenceVaultState state) {
    if (state.isSelectMode) {
      return AppBar(
        backgroundColor: AppColors.surface,
        leading: IconButton(
          icon: const Icon(Icons.close, color: AppColors.textPrimary),
          onPressed: () => ref.read(vaultProvider.notifier).clearSelection(),
        ),
        title: Text('${state.selectedItems.length} Selected', style: const TextStyle(color: AppColors.textPrimary, fontFamily: 'Poppins')),
        actions: [
          IconButton(icon: const Icon(Icons.share, color: AppColors.textPrimary), onPressed: () {}),
          IconButton(icon: const Icon(Icons.download, color: AppColors.textPrimary), onPressed: () {}),
          IconButton(icon: const Icon(Icons.delete, color: AppColors.danger), onPressed: () {}),
        ],
      );
    }

    return AppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      title: const Text('Evidence Vault', style: TextStyle(color: AppColors.textPrimary, fontFamily: 'Poppins', fontWeight: FontWeight.bold)),
      centerTitle: true,
      actions: [
        IconButton(
          icon: const Icon(Icons.lock_outline, color: AppColors.primary),
          onPressed: () {},
        ),
      ],
    );
  }

  Widget _buildLockScreen(WidgetRef ref) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.lock_person, size: 100, color: AppColors.primary)
              .animate(onPlay: (controller) => controller.repeat(reverse: true))
              .scaleXY(end: 1.1, duration: 1000.ms),
          const SizedBox(height: 32),
          const Text('Encrypted Vault', style: TextStyle(color: AppColors.textPrimary, fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
          const SizedBox(height: 8),
          const Text('Unlock to view secured evidence', style: TextStyle(color: AppColors.textSecondary, fontFamily: 'Poppins')),
          const SizedBox(height: 48),
          ElevatedButton.icon(
            onPressed: () => ref.read(vaultProvider.notifier).unlock(),
            icon: const Icon(Icons.fingerprint, size: 28, color: Colors.white),
            label: const Text('Authenticate', style: TextStyle(color: Colors.white, fontSize: 16, fontFamily: 'Poppins')),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVaultContent(WidgetRef ref, EvidenceVaultState state) {
    final filters = ['All', 'Screenshots', 'URLs', 'Chats', 'Reports'];
    final filteredItems = state.selectedFilter == 'All' 
        ? state.items 
        : state.items.where((i) => i.type == state.selectedFilter).toList();

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: _buildGlassCard(
            child: TextField(
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: InputDecoration(
                hintText: 'Search evidence...',
                hintStyle: const TextStyle(color: AppColors.textSecondary),
                prefixIcon: const Icon(Icons.search, color: AppColors.textSecondary),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
        ).animate().slideY(begin: -0.2, end: 0).fade(),
        
        SizedBox(
          height: 50,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: filters.length,
            itemBuilder: (context, index) {
              final filter = filters[index];
              final isSelected = state.selectedFilter == filter;
              return Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: ChoiceChip(
                  label: Text(filter, style: TextStyle(color: isSelected ? Colors.white : AppColors.textSecondary, fontFamily: 'Poppins')),
                  selected: isSelected,
                  selectedColor: AppColors.primary,
                  backgroundColor: AppColors.surface,
                  side: BorderSide(color: isSelected ? AppColors.primary : AppColors.surfaceLight),
                  onSelected: (_) => ref.read(vaultProvider.notifier).setFilter(filter),
                ),
              );
            },
          ),
        ).animate().slideX(begin: 0.1, end: 0, delay: 100.ms).fade(),
        
        const SizedBox(height: 16),
        
        Expanded(
          child: filteredItems.isEmpty
              ? _buildEmptyState()
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  itemCount: filteredItems.length,
                  itemBuilder: (context, index) {
                    final item = filteredItems[index];
                    final isSelected = state.selectedItems.contains(item.id);
                    
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12.0),
                      child: GestureDetector(
                        onLongPress: () => ref.read(vaultProvider.notifier).toggleSelection(item.id),
                        onTap: () {
                          if (state.isSelectMode) {
                            ref.read(vaultProvider.notifier).toggleSelection(item.id);
                          }
                        },
                        child: _buildEvidenceCard(item, isSelected),
                      ),
                    ).animate().slideY(begin: 0.2, end: 0, delay: Duration(milliseconds: 200 + (index * 100))).fade();
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.folder_open, size: 80, color: AppColors.surfaceLight),
          const SizedBox(height: 16),
          const Text('No evidence found', style: TextStyle(color: AppColors.textSecondary, fontSize: 16, fontFamily: 'Poppins')),
        ],
      ).animate().fade(),
    );
  }

  Widget _buildEvidenceCard(EvidenceItem item, bool isSelected) {
    IconData getIcon() {
      switch (item.type) {
        case 'Screenshots': return Icons.image;
        case 'URLs': return Icons.link;
        case 'Chats': return Icons.chat;
        case 'Reports': return Icons.article;
        default: return Icons.insert_drive_file;
      }
    }

    return _buildGlassCard(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          if (isSelected)
            const Padding(
              padding: EdgeInsets.only(right: 12.0),
              child: Icon(Icons.check_circle, color: AppColors.primary),
            ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(getIcon(), color: AppColors.primary),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.title, style: const TextStyle(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontFamily: 'Poppins'), maxLines: 1, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 4),
                Text('${item.date} • ${item.size}', style: const TextStyle(color: AppColors.textSecondary, fontSize: 12, fontFamily: 'Poppins')),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.success.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppColors.success.withOpacity(0.3)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.lock, size: 10, color: AppColors.success),
                const SizedBox(width: 4),
                Text(item.status, style: const TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
      borderColor: isSelected ? AppColors.primary : AppColors.surfaceLight.withOpacity(0.5),
    );
  }

  Widget _buildGlassCard({required Widget child, EdgeInsetsGeometry padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 4), Color? borderColor}) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: AppColors.surface.withOpacity(0.5),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: borderColor ?? AppColors.surfaceLight.withOpacity(0.5)),
          ),
          child: child,
        ),
      ),
    );
  }
}
