import React, { useEffect, useRef } from 'react';
import { SupabaseNote } from '@/hooks/useSupabaseNotes';

interface GraphViewProps {
  notes: SupabaseNote[];
  selectedNote: SupabaseNote | null;
  onNoteSelect: (note: SupabaseNote) => void;
  onNoteHover: (note: SupabaseNote | null) => void;
  selectedFolder: string;
}

export const GraphView: React.FC<GraphViewProps> = ({
  notes,
  selectedNote,
  onNoteSelect,
  onNoteHover,
  selectedFolder,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredNotes = selectedFolder === 'all' 
    ? notes 
    : notes.filter(note => note.folder === selectedFolder);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();

    // Simple fixed-radius circular layout
    const radius = Math.min(canvas.width, canvas.height) * 0.25;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const nodes = filteredNotes.map((note, index) => {
      const angle = (index / filteredNotes.length) * 2 * Math.PI;
      return {
        id: note.id,
        title: note.title,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        status: note.status,
        ai_generated: note.ai_generated,
      };
    });

    const getStatusColor = (status: string, aiGenerated: boolean) => {
      if (aiGenerated) return '#8b5cf6'; // Purple for AI-generated
      switch (status) {
        case 'mastered': return '#10b981';
        case 'in-progress': return '#3b82f6';
        case 'to-revisit': return '#f59e0b';
        default: return '#9ca3af';
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw links
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      filteredNotes.forEach(note => {
        note.links.forEach(linkId => {
          const sourceNode = nodes.find(n => n.id === note.id);
          const targetNode = nodes.find(n => n.id === linkId);
          if (sourceNode && targetNode) {
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        });
      });
      // Draw nodes
      nodes.forEach(node => {
        const isSelected = selectedNote?.id === node.id;
        const nodeRadius = isSelected ? 14 : 10;
        // Draw shadow
        ctx.beginPath();
        ctx.arc(node.x + 2, node.y + 2, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();
        // Draw main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = getStatusColor(node.status, node.ai_generated);
        ctx.fill();
        if (isSelected) {
          ctx.strokeStyle = '#1f2937';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        // Label below node, default font/offset
        ctx.fillStyle = '#374151';
        ctx.font = '13px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const text = node.title.length > 15 ? node.title.slice(0, 15) + '...' : node.title;
        ctx.fillText(text, node.x, node.y + nodeRadius + 8);
      });
    };

    draw();

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedNode = nodes.find(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) <= 14;
      });

      if (clickedNode) {
        const note = notes.find(n => n.id === clickedNode.id);
        if (note) onNoteSelect(note);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const hoveredNode = nodes.find(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) <= 14;
      });

      canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [notes, selectedNote, selectedFolder, onNoteSelect, filteredNotes]);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-gradient-to-br from-blue-50 to-indigo-50">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Progress Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-gray-700 font-medium">Mastered</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-700 font-medium">To Revisit</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-700 font-medium">AI Generated</span>
          </div>
        </div>
      </div>
      {/* Info Panel */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900">
          {selectedFolder === 'all' ? 'Knowledge Graph' : selectedFolder}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {filteredNotes.length} notes • Click to explore
        </p>
      </div>
    </div>
  );
};
