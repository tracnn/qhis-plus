<script setup>
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/api";
import Swal from 'sweetalert2';

// Vuelidate
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

// Main store and Router
const store = useTemplateStore();
const router = useRouter();
const authStore = useAuthStore();

// Input state variables
const state = reactive({
  username: '',
  password: '',
  rememberMe: false,
  loading: false
});

// Validation rules
const rules = computed(() => ({
  username: { required, minLength: minLength(3) },
  password: { required, minLength: minLength(5) },
}));

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  const result = await v$.value.$validate();

  if (!result) return;

  state.loading = true;
  try {
    // Gọi API login
    const response = await authService.login({
      username: state.username,
      password: state.password
    });

    // Lưu token
    const accessToken = response.data.data.accessToken;
    const refreshToken = response.data.data.refreshToken;
    console.log(accessToken, refreshToken);
    if (!accessToken || !refreshToken) {
      throw new Error('Không nhận được access_token hoặc refresh_token');
    }

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Lưu thông tin đăng nhập nếu Remember Me được chọn
    if (state.rememberMe) {
      localStorage.setItem('remembered_username', state.username);
      localStorage.setItem('remembered_password', state.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('remembered_username');
      localStorage.removeItem('remembered_password');
      localStorage.removeItem('rememberMe');
    }
    
    // Cập nhật auth store
    authStore.isAuthenticated = true;
    authStore.user = response.data;
    
    // Chuyển hướng đến dashboard
    //await router.replace('/backend/dashboard');

    // Hiển thị thông báo thành công
    await Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công!',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
}

// Kiểm tra và điền thông tin đăng nhập đã lưu
onMounted(() => {
  const rememberedUsername = localStorage.getItem('remembered_username');
  const rememberedPassword = localStorage.getItem('remembered_password');
  const rememberMe = localStorage.getItem('rememberMe');
  
  if (rememberedUsername && rememberedPassword) {
    state.username = rememberedUsername;
    state.password = rememberedPassword;
    state.rememberMe = rememberMe === 'true';
  }
});
</script>

<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Sign In Block -->
          <BaseBlock title="Sign In" class="mb-0">
            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">QHIS Plus</h1>
              <p class="fw-medium text-muted">Welcome, please login.</p>

              <!-- Sign In Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      id="login-username"
                      name="login-username"
                      placeholder="Username"
                      :class="{
                        'is-invalid': v$.username.$errors.length,
                      }"
                      v-model="state.username"
                      @blur="v$.username.$touch"
                      :disabled="state.loading"
                    />
                    <div
                      v-if="v$.username.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your username
                    </div>
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-alt form-control-lg"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      :class="{
                        'is-invalid': v$.password.$errors.length,
                      }"
                      v-model="state.password"
                      @blur="v$.password.$touch"
                      :disabled="state.loading"
                    />
                    <div
                      v-if="v$.password.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your password
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="login-remember"
                        name="login-remember"
                        v-model="state.rememberMe"
                        :disabled="state.loading"
                      />
                      <label class="form-check-label" for="login-remember">Remember Me</label>
                    </div>
                  </div>
                </div>
                
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-5">
                    <button 
                      type="submit" 
                      class="btn w-100 btn-alt-primary"
                      :disabled="state.loading"
                    >
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      {{ state.loading ? 'Đang đăng nhập...' : 'Sign In' }}
                    </button>
                  </div>
                </div>
              </form>
              <!-- END Sign In Form -->
            </div>
          </BaseBlock>
          <!-- END Sign In Block -->
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        <strong>{{ store.app.name + " " + store.app.version }}</strong> &copy;
        {{ store.app.copyright }}
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
