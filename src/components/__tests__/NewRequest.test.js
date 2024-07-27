import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import RequestForm from '../../components/NewRequest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/newRequest', name: 'NewRequest', component: {} }]
});

describe('RequestForm', () => {
    it('renders correctly', () => {
      const wrapper = mount(RequestForm, {
        global: {
          plugins: [router]
        }
      });
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('initializes with empty form fields', () => {
        const wrapper = mount(RequestForm, {
          global: {
            plugins: [router]
          }
        });
        const { requestForm } = wrapper.vm;
        expect(requestForm.dateRequest).toBe('');
        expect(requestForm.firstName).toBe('');
        expect(requestForm.lastName).toBe('');
        expect(requestForm.titleRequest).toBe('');
        expect(requestForm.requestContent).toBe('');
    });
});