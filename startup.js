const speciesImport = import("./Species/speciesList.json", {
  assert: {type: 'json'}
});

speciesImport.then( data => {
	  console.log(data.default);
	
	  const { createApp } = Vue

	  createApp({
		data(speciesList) {
		  return {
			title: 'Gombahatározó',
			speciesList: data.default,
			nameFilter: '',
			capFilter: '',
			gillsFilter: '',
			presenceFilter: '',
			stalkFilter : '',
			fleshFilter: '',
			ringOnlyFilter: false,
			sackOnlyFilter: false
		  }
		},
	    computed: {
			speciesListFiltered() {
				return this.filterSpeciesByName(
					this.filterSpeciesByCap(
						this.filterSpeciesByGills(
							this.filterSpeciesByPresence(
								this.filterSpeciesByStalk(
									this.filterSpeciesByFlesh(
										this.filterSpeciesByRingOnlyFilter(
											this.filterSpeciesBySackOnlyFilter(this.speciesList)
										)
									)
								)
							)
						)
					)
				);
			},
			resultCount() {
				return this.speciesListFiltered.length;
			}
		},
		methods: {
			filterSpeciesByName: function(species) {
				return species.filter(x => this.nameFilter == '' || this.nameFilter !== '' && x.NameHU.includes(this.nameFilter));
			},
			filterSpeciesByCap: function(species) {
				return species.filter(x => this.capFilter == '' || this.capFilter !== '' && x.CapText != '' && x.CapText.includes(this.capFilter));
			},
			filterSpeciesByGills: function(species) {
				return species.filter(x => this.gillsFilter == '' || this.gillsFilter !== '' && x.GillsText != '' && x.GillsText.includes(this.gillsFilter));
			},
			filterSpeciesByPresence: function(species) {
				return species.filter(x => this.presenceFilter == '' || this.presenceFilter !== '' && x.PresenceText != '' && x.PresenceText.includes(this.presenceFilter));
			},
			filterSpeciesByStalk: function(species) {
				return species.filter(x => this.stalkFilter == '' || this.stalkFilter !== '' && x.StalkText != '' && x.StalkText.includes(this.stalkFilter));
			},
			filterSpeciesByFlesh: function(species) {
				return species.filter(x => this.fleshFilter == '' || this.fleshFilter !== '' && x.FleshText != '' && x.FleshText.includes(this.fleshFilter));
			},
			filterSpeciesByRingOnlyFilter: function(species) {
				if (!this.ringOnlyFilter) { return species; }
				return species.filter(x => x.StalkText != '' && (x.StalkText.includes('gallér') || x.StalkText.includes('gyűrű')));
			},
			filterSpeciesBySackOnlyFilter: function(species) {
				if (!this.sackOnlyFilter) { return species; }
				return species.filter(x => x.StalkText != '' && x.StalkText.includes('bocskor'));
			}
		}
	  }).mount('#app')
});