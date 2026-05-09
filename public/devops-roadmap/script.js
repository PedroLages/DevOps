const modules = [
  { id: '1', title: 'Introduction to CI/CD', duration: '2h', lessons: 8, completed: true, description: 'Learn the fundamentals of Continuous Integration and Continuous Deployment. We will cover the history, benefits, and core concepts behind automated pipelines.' },
  { id: '2', title: 'Docker Basics', duration: '3h 15m', lessons: 12, completed: false, description: 'Containerize your applications with Docker. Understand images, containers, volumes, and networks to build portable environments.' },
  { id: '3', title: 'Kubernetes Orchestration', duration: '5h', lessons: 18, completed: false, description: 'Manage containerized applications at scale using Kubernetes. Dive into pods, deployments, services, and ingress controllers.' },
  { id: '4', title: 'Infrastructure as Code', duration: '4h 30m', lessons: 10, completed: false, description: 'Automate infrastructure provisioning with tools like Terraform. Learn to define your cloud environments as version-controlled code.' },
];

function toggleModule(id) {
  const desc = document.getElementById(`module-desc-${id}`);
  const icon = document.getElementById(`module-icon-${id}`);
  if (desc && desc.classList.contains('hidden')) {
    desc.classList.remove('hidden');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  } else if (desc) {
    desc.classList.add('hidden');
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  }
}

function renderModules() {
  const container = document.getElementById('modules-container');
  let html = '';
  
  const nextTargetIndex = modules.findIndex(m => !m.completed);

  modules.forEach((module, index) => {
    const isNext = !module.completed && index === nextTargetIndex;
    const isLocked = !module.completed && index > nextTargetIndex;
    
    // Timeline Node
    const nodeClass = module.completed ? 'bg-green-500' : (isNext ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-200');
    let nodeContent = '';
    if (module.completed) {
      nodeContent = '<i data-lucide="check" class="w-4 h-4 text-white"></i>';
    } else if (!isNext) {
      nodeContent = '<i data-lucide="lock" class="w-3.5 h-3.5 text-slate-400"></i>';
    } else {
      nodeContent = '<span class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>';
    }

    // Card styling
    const cardClass = isNext ? 'border-blue-200 shadow-sm ring-1 ring-blue-50 cursor-pointer' : (isLocked ? 'border-slate-100 bg-slate-50/50 opacity-60 pointer-events-none' : 'border-slate-100 bg-white cursor-pointer hover:shadow-md');
    
    // Status Tag
    let statusTagHTML = '';
    if (module.completed) {
      statusTagHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider"><i data-lucide="check-circle-2" class="w-3 h-3"></i> Completed</span>';
    } else if (isNext) {
      statusTagHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider"><i data-lucide="play-circle" class="w-3 h-3"></i> Up Next</span>';
    } else {
      statusTagHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider"><i data-lucide="lock" class="w-3 h-3"></i> Locked</span>';
    }
    
    // Title Class
    const titleClass = module.completed ? 'text-slate-800' : (isLocked ? 'text-slate-500' : 'text-slate-900');

    // Expanded logic: expand if UpNext or Completed? Actually, Let's default expand only "Up Next"
    const expanded = isNext;
    const hideClass = expanded ? '' : 'hidden';
    const chevronRotation = expanded ? 'rotate(180deg)' : 'rotate(0deg)';

    // Action button
    let actionHTML = '';
    if (isNext) {
      actionHTML = `<button onclick="event.stopPropagation()" class="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"><i data-lucide="play-circle" class="w-4 h-4"></i>Start Module</button>`;
    } else if (module.completed) {
      actionHTML = `<button onclick="event.stopPropagation()" class="w-full md:w-auto bg-green-50 hover:bg-green-100 text-green-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-green-200">Review</button>`;
    } else {
      actionHTML = `<button onclick="event.stopPropagation()" class="w-full md:w-auto bg-slate-100 text-slate-400 px-5 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed border border-slate-200"><i data-lucide="lock" class="w-4 h-4 inline-block mr-1"></i>Locked</button>`;
    }

    html += `
      <div class="relative pl-8 group ${isLocked ? 'opacity-80' : ''}">
        <div class="absolute -left-[17px] top-4 rounded-full border-4 border-white w-8 h-8 flex items-center justify-center z-10 transition-colors duration-300 ${nodeClass}">
          ${nodeContent}
        </div>
        <div class="border rounded-2xl p-6 transition-all duration-300 ${cardClass}" ${!isLocked ? `onclick="toggleModule('${module.id}')"` : ''}>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex-grow">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Module ${index + 1}</span>
                ${statusTagHTML}
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold ${titleClass}">
                  ${module.title}
                </h3>
                ${!isLocked ? `<button id="module-icon-${module.id}" class="text-slate-400 hover:text-slate-600 transition-transform duration-300" style="transform: ${chevronRotation}"><i data-lucide="chevron-down" class="w-5 h-5"></i></button>` : ''}
              </div>
            </div>
            
            <div class="flex-shrink-0 mt-4 md:mt-0 ${!expanded && !isLocked ? 'md:block hidden' : ''}">
              ${actionHTML}
            </div>
          </div>
          
          <div id="module-desc-${module.id}" class="${hideClass} transition-all mt-4 pt-4 border-t border-slate-100">
            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              ${module.description}
            </p>
            
            <div class="flex items-center gap-6 mt-4">
              <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <i data-lucide="clock" class="w-4 h-4"></i>
                </div>
                ${module.duration}
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <i data-lucide="video" class="w-4 h-4"></i>
                </div>
                ${module.lessons} total lessons
              </div>
            </div>
            
            <div class="mt-4 md:hidden">
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
  
  // Update heroic progress bar
  const heroText = document.getElementById('hero-progress-text');
  const heroBar = document.getElementById('hero-progress-bar');
  if (heroText) heroText.innerText = `${progressPercentage}%`;
  if (heroBar) {
    setTimeout(() => {
      heroBar.style.width = `${progressPercentage}%`;
    }, 100);
  }
  
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
