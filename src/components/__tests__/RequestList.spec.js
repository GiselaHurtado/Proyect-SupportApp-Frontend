import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import RequestList from '../../components/RequestList.vue';
import { useRequestStore } from '../../stores/supportap';

// Mock del router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/requestEdit/:id', name: 'requestedit', component: {} }]
});

describe('RequestList', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    // Configurar Pinia
    setActivePinia(createPinia());
    store = useRequestStore();

    // Mock de las acciones del store
    vi.spyOn(store, 'fetchRequests').mockResolvedValue();

    // Montar el componente
    wrapper = mount(RequestList, {
      global: {
        plugins: [router],
        provide: {
          store: store
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.find('.bg-custom').exists()).toBe(true);
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('fetches requests on mount', () => {
    expect(store.fetchRequests).toHaveBeenCalled();
  });

  it('displays requests correctly', async () => {
    // Simular datos de solicitudes
    const mockRequests = [
      { id: 1, firstName: 'John', lastName: 'Doe', titleRequest: 'Test Request', status: 'active' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', titleRequest: 'Another Request', status: 'closed' }
    ];
    wrapper.vm.requests = mockRequests;
    await wrapper.vm.$nextTick();

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(2);
    expect(rows[0].find('.username').text()).toContain('John Doe');
    expect(rows[1].find('.username').text()).toContain('Jane Smith');
  });

  it('toggles selection correctly', async () => {
    wrapper.vm.requests = [{ id: 1 }, { id: 2 }];
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    await checkboxes[1].setValue(true);
    expect(wrapper.vm.selectedRequestIds).toContain(1);

    await checkboxes[0].setValue(true); // Select All
    expect(wrapper.vm.selectedRequestIds).toHaveLength(0);

    await checkboxes[0].setValue(false); // Deselect All
    expect(wrapper.vm.selectedRequestIds).toHaveLength(2);
  });

  it('handles edit action correctly', async () => {
    const mockRequest = { id: 1 };
    const routerPushSpy = vi.spyOn(router, 'push');

    await wrapper.vm.handleAction('edit', mockRequest, new Event('click'));

    expect(routerPushSpy).toHaveBeenCalledWith({
      name: 'requestedit',
      params: { id: '1' }
    });
  });

  it('applies correct status class', () => {
    expect(wrapper.vm.getStatusClass('active')).toBe('bu');
    expect(wrapper.vm.getStatusClass('closed')).toBe('bu4');
    expect(wrapper.vm.getStatusClass('unknown')).toBe('bu2');
  });
});