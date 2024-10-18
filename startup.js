"use strict";

const speciesImport = import("./Species/speciesList.json", {
    assert: { type: 'json' },
    with: { type: 'json' }
});

speciesImport.then(data => {
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
                stalkFilter: '',
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
            filterSpeciesByName: function (species) {
                return species.filter(x => this.nameFilter == '' || this.nameFilter !== '' && x.NameHU.toLowerCase().includes(this.nameFilter.toLowerCase()));
            },
            filterSpeciesByCap: function (species) {
                return species.filter(x => this.capFilter == '' || this.capFilter !== '' && x.CapText.toLowerCase() != '' && x.CapText.toLowerCase().includes(this.capFilter.toLowerCase()));
            },
            filterSpeciesByGills: function (species) {
                return species.filter(x => this.gillsFilter == '' || this.gillsFilter !== '' && x.GillsText != '' && x.GillsText.toLowerCase().includes(this.gillsFilter.toLowerCase()));
            },
            filterSpeciesByPresence: function (species) {
                return species.filter(x => this.presenceFilter == '' || this.presenceFilter !== '' && x.PresenceText != '' && x.PresenceText.toLowerCase().includes(this.presenceFilter.toLowerCase()));
            },
            filterSpeciesByStalk: function (species) {
                return species.filter(x => this.stalkFilter == '' || this.stalkFilter !== '' && x.StalkText != '' && x.StalkText.toLowerCase().includes(this.stalkFilter.toLowerCase()));
            },
            filterSpeciesByFlesh: function (species) {
                return species.filter(x => this.fleshFilter == '' || this.fleshFilter !== '' && x.FleshText != '' && x.FleshText.toLowerCase().includes(this.fleshFilter.toLowerCase()));
            },
            filterSpeciesByRingOnlyFilter: function (species) {
                if (!this.ringOnlyFilter) { return species; }
                return species.filter(x => x.StalkText != '' && (x.StalkText.toLowerCase().includes('gallér') || x.StalkText.toLowerCase().includes('gyűrű')));
            },
            filterSpeciesBySackOnlyFilter: function (species) {
                if (!this.sackOnlyFilter) { return species; }
                return species.filter(x => x.StalkText != '' && x.StalkText.toLowerCase().includes('bocskor'));
            }
        }
    }).mount('#app')
});