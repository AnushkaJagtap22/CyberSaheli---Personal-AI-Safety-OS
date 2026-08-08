import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Message {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  Message(this.text, this.isUser, this.timestamp);
}

class AIAssistantState extends StateNotifier<List<Message>> {
  AIAssistantState() : super([
    Message('Namaste! 💜 I am Saheli AI, your personal cyber safety assistant. How can I help you today?', false, DateTime.now())
  ]);

  void addMessage(String text, bool isUser) {
    state = [...state, Message(text, isUser, DateTime.now())];
    if (isUser) {
      _simulateBotResponse();
    }
  }

  void _simulateBotResponse() {
    Future.delayed(const Duration(milliseconds: 1500), () {
      state = [
        ...state,
        Message('I understand this is concerning. Please stay calm. Let me analyze this and provide immediate steps.', false, DateTime.now())
      ];
    });
  }
}

final chatProvider = StateNotifierProvider<AIAssistantState, List<Message>>((ref) => AIAssistantState());

class AiAssistantPage extends ConsumerStatefulWidget {
  const AiAssistantPage({super.key});

  @override
  ConsumerState<AiAssistantPage> createState() => _AiAssistantPageState();
}

class _AiAssistantPageState extends ConsumerState<AiAssistantPage> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  String _selectedLang = 'English';

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;
    ref.read(chatProvider.notifier).addMessage(text.trim(), true);
    _controller.clear();
    _scrollToBottom();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final messages = ref.watch(chatProvider);

    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E1E32),
        title: Row(
          children: [
            const CircleAvatar(
              backgroundColor: Color(0xFF6C63FF),
              child: Icon(Icons.smart_toy, color: Colors.white),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('Saheli AI', style: TextStyle(color: Colors.white, fontSize: 16)),
                Text('Online', style: TextStyle(color: Color(0xFF00D68F), fontSize: 12)),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          _buildLanguageSelector(),
          Expanded(
            child: messages.length == 1 
              ? _buildEmptyState()
              : ListView.builder(
                  controller: _scrollController,
                  padding: const EdgeInsets.all(16),
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index];
                    return _buildMessageBubble(msg);
                  },
                ),
          ),
          _buildInputArea(),
        ],
      ),
    );
  }

  Widget _buildLanguageSelector() {
    final langs = ['English', 'हिंदी', 'मराठी', 'Hinglish'];
    return Container(
      height: 50,
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: langs.map((lang) => Padding(
          padding: const EdgeInsets.only(right: 8.0),
          child: ChoiceChip(
            label: Text(lang),
            selected: _selectedLang == lang,
            onSelected: (val) {
              if(val) setState(() => _selectedLang = lang);
            },
            backgroundColor: const Color(0xFF1E1E32),
            selectedColor: const Color(0xFF6C63FF),
            labelStyle: TextStyle(color: _selectedLang == lang ? Colors.white : Colors.white70),
          ),
        )).toList(),
      ),
    );
  }

  Widget _buildEmptyState() {
    final suggestions = [
      'Is this message real?',
      'Can I trust this profile?',
      'Is this URL safe?',
      'What should I do?',
      'How to file cyber complaint?'
    ];
    
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.security, size: 64, color: Color(0xFF6C63FF)),
          const SizedBox(height: 24),
          const Text('How can I assist your safety today?', 
            style: TextStyle(color: Colors.white, fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 32),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: suggestions.map((s) => ActionChip(
              label: Text(s),
              backgroundColor: const Color(0xFF1E1E32).withOpacity(0.5),
              side: const BorderSide(color: Color(0xFF6C63FF), width: 1),
              labelStyle: const TextStyle(color: Colors.white),
              onPressed: () => _sendMessage(s),
            )).toList(),
          )
        ],
      ),
    );
  }

  Widget _buildMessageBubble(Message msg) {
    return Align(
      alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        decoration: BoxDecoration(
          color: msg.isUser ? const Color(0xFF252542) : const Color(0xFF6C63FF).withOpacity(0.2),
          borderRadius: BorderRadius.circular(20).copyWith(
            bottomRight: msg.isUser ? const Radius.circular(0) : const Radius.circular(20),
            bottomLeft: !msg.isUser ? const Radius.circular(0) : const Radius.circular(20),
          ),
          border: Border.all(
            color: msg.isUser ? Colors.transparent : const Color(0xFF6C63FF).withOpacity(0.5),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(msg.text, style: const TextStyle(color: Colors.white, fontSize: 15)),
            const SizedBox(height: 4),
            Text(
              "${msg.timestamp.hour}:${msg.timestamp.minute.toString().padLeft(2, '0')}",
              style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: const BoxDecoration(
        color: Color(0xFF1E1E32),
      ),
      child: SafeArea(
        child: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.attach_file, color: Color(0xFFB8B8D0)),
              onPressed: () {},
            ),
            Expanded(
              child: TextField(
                controller: _controller,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Type your message...',
                  hintStyle: const TextStyle(color: Color(0xFFB8B8D0)),
                  filled: true,
                  fillColor: const Color(0xFF0F0F1A),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(24),
                    borderSide: BorderSide.none,
                  ),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                ),
                onSubmitted: _sendMessage,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.mic, color: Color(0xFFB8B8D0)),
              onPressed: () {},
            ),
            CircleAvatar(
              backgroundColor: const Color(0xFF6C63FF),
              child: IconButton(
                icon: const Icon(Icons.send, color: Colors.white, size: 18),
                onPressed: () => _sendMessage(_controller.text),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
