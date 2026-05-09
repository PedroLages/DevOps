const modules = [
  { id: '1', title: 'Introduction to CI/CD', duration: '2h', completed: true, description: 'Learn the fundamentals of Continuous Integration and Continuous Deployment. We will cover the history, benefits, and core concepts behind automated pipelines.' },
  { id: '2', title: 'Docker Basics', duration: '3h 15m', completed: false, description: 'Containerize your applications with Docker. Understand images, containers, volumes, and networks to build portable environments.' },
  { id: '3', title: 'Kubernetes Orchestration', duration: '5h', completed: false, description: 'Manage containerized applications at scale using Kubernetes. Dive into pods, deployments, services, and ingress controllers.' },
  { id: '4', title: 'Infrastructure as Code', duration: '4h 30m', completed: false, description: 'Automate infrastructure provisioning with tools like Terraform. Learn to define your cloud environments as version-controlled code.' },
];

function renderModules() {
  const container = document.getElementById('modules-container');
  let html = '';
  
  const nextTargetIndex = modules.findIndex(m => !m.completed);

  modules.forEach((module, index) => {
    const isNext = !module.completed && index === nextTargetIndex;
    
    // Timeline Node
    const nodeClass = module.completed ? 'bg-green-500' : (isNext ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-200');
    let nodeContent = '';
    if (module.completed) {
      nodeContent = '<i data-lucide="check" class="w-4 h-4 text-white"></i>';
    } else if (!isNext) {
      nodeContent = '<span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>';
    } else {
      nodeContent = '<span class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>';
    }

    // Card styling
    const cardClass = isNext ? 'border-blue-200 shadow-sm ring-1 ring-blue-50' : 'border-slate-100';
    
    // Status Tag
    let statusTagHTML = '';
    if (module.completed) {
      statusTagHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Completed</span>';
    } else if (isNext) {
      statusTagHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Up Next</span>';
    }
    
    // Title Class
    const titleClass = module.completed ? 'text-slate-800' : 'text-slate-900';

    // Action button
    let actionHTML = '';
    if (isNext) {
      actionHTML = `<button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2"><i data-lucide="play-circle" class="w-4 h-4"></i>Start Module</button>`;
    } else if (module.completed) {
      actionHTML = `<button class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all">Review</button>`;
    } else {
      actionHTML = `<button class="bg-slate-50 text-slate-400 px-5 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed">Locked</button>`;
    }

    html += `
      <div class="relative pl-8 group">
        <div class="absolute -left-[17px] top-1 rounded-full border-4 border-white w-8 h-8 flex items-center justify-center z-10 transition-colors duration-300 ${nodeClass}">
          ${nodeContent}
        </div>
        <div class="bg-white border rounded-2xl p-6 transition-all duration-300 hover:shadow-md ${cardClass}">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Module ${index + 1}</span>
                ${statusTagHTML}
              </div>
              <h3 class="text-xl font-bold mb-2 ${titleClass}">
                ${module.title}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-4">
                ${module.description}
              </p>
              
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <i data-lucide="clock" class="w-4 h-4"></i>
                  ${module.duration}
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <i data-lucide="video" class="w-4 h-4"></i>
                  12 video lessons
                </div>
              </div>
            </div>
            
            <div class="flex-shrink-0 mt-4 md:mt-0">
              ${actionHTML}
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
  
  // Update header button
  document.getElementById('start-btn-text').innerText = completedCount === 0 ? 'Start Learning' : 'Continue Learning';
  
  // Update texts
  document.getElementById('module-count').innerText = `${totalCount} Modules`;
  document.getElementById('completed-count').innerText = `${completedCount} / ${totalCount}`;
  document.getElementById('progress-text').innerText = progressPercentage.toString();
  
  // Update circle
  const circle = document.getElementById('progress-circle');
  if (circle) {
    const maxOffset = 263.89;
    const offset = maxOffset - (maxOffset * progressPercentage) / 100;
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderModules();
    updateProgress();
});
