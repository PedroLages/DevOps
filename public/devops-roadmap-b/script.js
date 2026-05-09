const modules = [
  { id: '1', title: 'Introduction to CI/CD', duration: '2h', completed: true, points: '400 XP', description: 'Pipeline fundamentals. Establish the base connection to automated deployment systems.' },
  { id: '2', title: 'Docker Basics', duration: '3h 15m', completed: false, points: '650 XP', description: 'Containerization protocols. Isolate environments using standard Docker images.' },
  { id: '3', title: 'Kubernetes Orchestration', duration: '5h', completed: false, points: '1200 XP', description: 'Cluster management. Deploy, scale, and manage massive container grids.' },
  { id: '4', title: 'Infrastructure as Code', duration: '4h 30m', completed: false, points: '800 XP', description: 'Terraform blueprints. Provision cloud resources via version-controlled repositories.' },
];

function renderModules() {
  const container = document.getElementById('modules-container');
  let html = '';
  
  const nextTargetIndex = modules.findIndex(m => !m.completed);

  modules.forEach((module, index) => {
    const isNext = !module.completed && index === nextTargetIndex;
    
    // Status visual
    const borderClass = module.completed ? 'border-slate-700' : (isNext ? 'border-neon ring-1 ring-neon/30' : 'border-slate-800 border-dashed');
    const bgClass = module.completed ? 'bg-darker' : (isNext ? 'bg-dark' : 'bg-darker/50 opacity-50');
    
    // Index indicator
    let numberHTML = '';
    if (module.completed) {
      numberHTML = '<div class="w-12 h-12 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-xl"><i data-lucide="check" class="w-6 h-6"></i></div>';
    } else if (isNext) {
      numberHTML = '<div class="w-12 h-12 rounded bg-neon/10 text-neon flex items-center justify-center font-mono text-xl font-bold border border-neon/50">0' + (index + 1) + '</div>';
    } else {
      numberHTML = '<div class="w-12 h-12 rounded bg-slate-900 border border-slate-800 text-slate-700 flex items-center justify-center font-mono text-xl">0' + (index + 1) + '</div>';
    }

    // Action button
    let actionHTML = '';
    if (isNext) {
      actionHTML = `<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-neon text-darker px-4 py-2 text-xs font-mono font-bold tracking-wide flex items-center gap-2 rounded">MOUNT <i data-lucide="terminal" class="w-3 h-3"></i></button>`;
    } else if (module.completed) {
      actionHTML = `<button class="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 border border-slate-700 px-4 py-2 text-xs font-mono tracking-wide rounded hover:text-white hover:border-slate-500">REPLAY</button>`;
    } else {
      actionHTML = '<span class="text-slate-600 font-mono text-xs"><i data-lucide="lock" class="w-4 h-4"></i></span>';
    }
    
    const titleClass = isNext ? 'text-white' : (module.completed ? 'text-slate-300' : 'text-slate-500');

    html += `
      <div class="border ${borderClass} ${bgClass} rounded-xl p-6 transition-all duration-300 group hover:bg-dark">
        <div class="flex items-start gap-6">
          ${numberHTML}
          
          <div class="flex-grow">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-bold ${titleClass} font-sans tracking-tight">
                ${module.title}
              </h3>
              ${actionHTML}
            </div>
            
            <p class="text-slate-400 text-sm font-mono leading-relaxed mb-4 max-w-3xl">
              ${module.description}
            </p>
            
            <div class="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800/50">
              <div class="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <i data-lucide="clock" class="w-3 h-3 text-slate-600"></i> ${module.duration}
              </div>
              <div class="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <i data-lucide="award" class="w-3 h-3 text-slate-600"></i> ${module.points}
              </div>
              ${isNext ? '<div class="flex flex-grow justify-end"><span class="w-2 h-2 rounded-full bg-neon animate-ping"></span></div>' : ''}
            </div>
          </div>
                
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function updateProgress() {
  const completedCount = modules.filter(m => m.completed).length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  
  document.getElementById('progress-val').innerText = progressPercentage.toString();
  
  const startBtn = document.getElementById('start-btn');
  if (completedCount > 0 && completedCount < totalCount) {
    startBtn.innerText = 'RESUME_SEQ';
  }
}

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderModules();
    updateProgress();
});
