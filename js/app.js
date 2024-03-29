const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerComponent = {
  template: '#registerTemplate',
  name: 'RegisterComponent',
  data() {
    return {
      user: {
        firstname: '',
        email: '',
        password: '',
        passwordChck: '' } };
  },
  computed: {
    isFormValid() {
      return (
        this.isValid('firstname') &&
        this.isValid('email') &&
        this.isValid('password') &&
        this.isValid('passwordChck'));

    } },
  methods: {
    isValid(prop) {
      switch (prop) {
        case 'firstname':
          return this.user.firstname.length >= 2;
          break;
        case 'email':
          return emailRegex.test(this.user.email);
          break;
        case 'password':
          return this.user.password.length >= 6;
          break;
        case "passwordChck":
          return this.user.password === this.user.passwordChck;
          break;
        default:
          return false;}
    },
    resetUser() {
      this.user.firstname = '';
      this.user.email = '';
      this.user.password = '';
      this.user.passwordChck = '';
    },
    onSubmit() {
      let user = Object.assign({}, this.user);
      this.resetUser();
      this.$emit('register-form', { type: 'register', data: user });
    } },
  mounted() {
    let element = this.$el.querySelector('#passwordcheck');
    element.addEventListener('blur', () => {
      if (!this.isValid('passwordChck')) {
        element.classList.add('invalid');
      } else {
        element.classList.remove('invalid');
      }
    });
  } };

const signInComponent = {
  template: '#signinTemplate',
  name: 'SigninComponent',
  data() {
    return {
      user: {
        email: '',
        password: '' } };
  },
  methods: {
    handleForm() {
      let formvalue = Object.assign({}, this.user);
      this.resetFormValues();
      this.$emit('signin-form', { type: 'signin', data: formvalue });
    },
    resetFormValues() {
      this.user.email = '';
      this.user.password = '';
    },
    isValid(prop) {
      switch (prop) {
        case 'email':
          return emailRegex.test(this.user.email);
          break;
        case 'password':
          return this.user.password.length >= 6;
          break;
        default:
          return false;}

    } },
  computed: {
    isFormValid() {
      return this.isValid('email') && this.isValid('password');
    } } };


const editComponent = {
  template: '#editTemplate',
  name: "editComponent",
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordChck: '',
        prof: '',
        city: ''
      }
    }
  },
    computed: {
      isFormValid() {
        return (
          this.isValid('firstname') &&
          this.isValid('lastname') &&
          this.isValid('email') &&
          this.isValid('password') &&
          this.isValid('passwordChck') && 
          this.isValid('prof') &&
          this.isValid('city')) ;
      } 
    },
    methods: {
      isValid(prop) {
        switch (prop) {
          case 'firstname':
            return this.user.firstname.length >= 2;
            break;
          case 'lastname':
            return this.user.lastname.length >= 2;
            break;
          case 'email':
            return emailRegex.test(this.user.email);
            break;
          case 'password':
            return this.user.password.length >= 6;
            break;
          case "passwordChck":
            return this.user.password === this.user.passwordChck;
            break;
          case 'prof':
            return this.user.prof.length >= 3;
            break;
          case 'city':
            return this.user.city.length >= 3;
            break;
          default:
            return false;}
      },
      resetUser() {
        this.user.firstname = this.user.firstname;
        this.user.lastname = '';
        this.user.email = '';
        this.user.password = '';
        this.user.passwordChck = '';
        this.user.prof = '';
        this.user.city = '';
      },
      onSubmit() {
        let user = Object.assign({}, this.user);
        this.resetUser();
        this.$emit('edit-form', { type: 'edit', data: user });
      } }
};

const feedbackComponent = {
  template: '#feedbackTemplate',
  name: "FeedbackComponent",
  filters: {
    name(input) {
      return input.firstname ? input.firstname : '';
    },
    lastname(input) {
      return input.lastname ? input.lastname : '';
    },
    prof(input) {
      return input.prof ? input.prof : '';
    },
    city(input) {
      return input.city ? input.city : '';
    }
  },

  data() {return {};},
  props: ['feedback'],
  computed: {
    title() {
      return this.feedback.type === 'signin' ?
      'Проверка пройдена' : 'Информация!';
    } } };




const app = new Vue({
  el: '#app',
  components: {
    register: registerComponent,
    signin: signInComponent,
    edit: editComponent,
    feedback: feedbackComponent },

  name: 'application',
  data() {
    return {
      feedback: {},
      currentComponent: 'signin' };

  },
  methods: {
    handleForm(data) {
      this.feedback = data;
      setTimeout(() => {
        this.setComponent('feedback');
      }, 10);
    },
    isDisabled(btnName) {
      return this.currentComponent === btnName;
    },
    setComponent(componentName) {
      if (this.currentComponent !== componentName) {
        this.currentComponent = componentName;
      }
    } } });


    