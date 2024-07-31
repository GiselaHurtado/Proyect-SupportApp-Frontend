import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import RequestEdit from '../../components/RequestEdit.vue';


const routes = [
  { path: '/', redirect: '/request/1' },
  { path: '/request/:id', component: RequestEdit }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('RequestEdit.vue', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('should render correctly', async () => {

    const wrapper = mount(RequestEdit, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    
    await router.push('/request/1');
    await router.isReady();

    expect(wrapper.exists()).toBe(true);
  });

  it('should load request data on mount', async () => {
    const wrapper = mount(RequestEdit, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    await router.push('/request/1');
    await router.isReady();

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.request).not.toBeNull();
    expect(wrapper.vm.editedRequest).toEqual(wrapper.vm.request);
  });

  it('should call updateRequest on form submit', async () => {
    const wrapper = mount(RequestEdit, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    await router.push('/request/1');
    await router.isReady();

    wrapper.vm.updateRequest = vi.fn();
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.updateRequest).toHaveBeenCalled();
  });
});
